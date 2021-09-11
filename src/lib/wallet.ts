import { t_enc_key, t_enc_key_obj } from "../types";

import crypto from "crypto"
import hash from './hash'

import Transaction from './trasaction'

class Wallet {
	nonce = 0;
	cash_value = 300
	public_key: t_enc_key_obj;
	private_key: t_enc_key_obj;

	constructor() {

		const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
			modulusLength: 2048,
		})

		this.public_key = publicKey
		this.private_key = privateKey

	}

	create_transaction(amount: number, to = this.public_key) {

		const hash_obj = { from: this.public_key, to: to, amount: amount }

		const messg = hash(hash_obj)

		const digital_signature = crypto.sign("sha256", Buffer.from(messg), {
			key: this.private_key,
			padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
		})

		const transaction = new Transaction(this.nonce, this.public_key, to, amount, messg, digital_signature);
		this.nonce += 1;
		return transaction
	}

}

const wal = new Wallet

const public_key = wal.public_key.export({ type: 'pkcs1', format: "pem" })
const private_key = wal.private_key.export({ type: 'pkcs1', format: "pem" })



export default Wallet