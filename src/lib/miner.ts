import { t_block, t_data, t_enc_key, t_enc_key_obj, t_hash, t_miner, t_transaction, t_utxo } from "../types";
import crypto from 'crypto'
import calc_merkel_root from './merkel_tree_creator'
import hash from './hash'
import init_utxo_set from '../../data/init_utxo_set'
import get_keys from "./get_keys";
import { differenceWith } from 'ramda'
import chalk from "chalk";

class Block implements t_block {
	height: number;
	data: Object;
	timestamp: Date; miner: string;
	prev_block: t_block | null;
	prev_hash: t_hash | null;
	transactions: Array<t_transaction>;
	merkel_root!: t_hash

	constructor(height: number, data: Object, timestamp: Date, miner: string, prev_block: t_block | null, prev_hash: t_hash | null, transactions: Array<t_transaction>) {
		this.height = height
		this.data = data
		this.timestamp = timestamp
		this.miner = miner
		this.prev_block = prev_block
		this.prev_hash = prev_hash
		this.transactions = transactions

		this.calculate_merkel_root()
	}

	calculate_merkel_root() {

		const transactions = this.transactions.map((tr) => JSON.stringify(tr))

		this.merkel_root = calc_merkel_root(transactions)
	}
}

export class Miner implements t_miner {
	height: number;
	last_block: t_block | null;
	mem_pool: Array<t_transaction>
	utxo_set: Array<t_utxo>

	constructor() {
		this.height = 0;
		this.last_block = null
		this.mem_pool = []
		this.utxo_set = init_utxo_set
		this.sort_utxo_set()
	}

	sort_utxo_set() {
		this.utxo_set.sort((a, b) => b.amount - a.amount)
	}

	add_transaction(trs: t_transaction) {
		this.mem_pool.push(trs)
	}

	create_block(data: t_data, miner: string, transactions: Array<t_transaction>) {

		const prev_block = this.last_block
		let prev_hash = prev_block ? hash(prev_block) : null

		this.height += 1;

		const timestamp = new Date()

		this.last_block = new Block(this.height, data, timestamp, miner, prev_block, prev_hash, transactions)
	}

	utxo_generator(owner: t_enc_key_obj | t_enc_key, amount: number) {
		return { owner, amount }
	}

	utxo_proccessor(utxos: Array<t_utxo>, owner: t_enc_key | t_enc_key_obj, new_owner: t_enc_key | t_enc_key_obj, amount: number) {

		let tot_amount = 0
		for (const utxo of utxos)
			tot_amount += utxo.amount

		console.log(chalk.blue(tot_amount))

		const change = tot_amount - amount
		let change_utxo;
		const new_utxo = this.utxo_generator(new_owner, amount)

		this.utxo_set = differenceWith((a, b) => {
			let res = false
			if (a.amount == b.amount && a.owner == b.owner)
				res = true
			return res
		}, this.utxo_set, utxos)

		if (change) {
			change_utxo = this.utxo_generator(owner, change)
			this.utxo_set.push(change_utxo)
		}

		this.utxo_set.push(new_utxo)
	}

	verify_transaction({ messg, fr: public_key, to, amount, digital_signature }: t_transaction) {


		const res = crypto.verify(
			"sha256",
			Buffer.from(messg),
			{
				key: public_key as t_enc_key,
				padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
			},
			digital_signature
		);


		if (res) {
			const utxo_own_per: Array<t_utxo> = this.utxo_set.filter(({ owner }) => owner == public_key)
			const utxos_to_be_used: Array<t_utxo> = []
			let temp: number = 0
			let sum: number = 0


			for (let i = 0; i < utxo_own_per.length; i += 1) {
				sum = utxo_own_per[i].amount
			}


			if (sum < amount) {
				console.error(chalk.red(`${sum} is less than ${amount}`))
			}


			for (const utxo of utxo_own_per) {
				if (temp >= amount)
					break;
				utxos_to_be_used.push(utxo)
				temp += utxo.amount
			}

			this.utxo_proccessor(utxos_to_be_used, public_key, to, amount)
		}
	}


}