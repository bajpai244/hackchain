import { t_block, t_data, t_enc_key, t_hash, t_miner, t_transaction } from "../types";

import crypto from 'crypto'
import calc_merkel_root from './merkel_tree_creator'
import hash from './hash'

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

	constructor() {
		this.height = 0;
		this.last_block = null
	}

	create_block(data: t_data, miner: string, transactions: Array<t_transaction>) {

		const prev_block = this.last_block
		let prev_hash = prev_block ? hash(prev_block) : null

		this.height += 1;

		const timestamp = new Date()

		this.last_block = new Block(this.height, data, timestamp, miner, prev_block, prev_hash, transactions)
	}

	verify_transaction({ messg, fr: public_key, digital_signature }: t_transaction) {


		const res = crypto.verify(
			"sha256",
			Buffer.from(messg),
			{
				key: public_key,
				padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
			},
			digital_signature
		);

		console.log(res)

	}

}