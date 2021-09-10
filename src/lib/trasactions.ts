import { t_address, t_hash, t_hash_fn, t_transaction } from "../types";

class Transaction implements t_transaction {
	nonce: number;
	fr: t_address;
	to: t_address;
	amount: number;
	digital_signature: t_hash;
	messg: string


	constructor(nonce: number, fr: t_address, to: t_address, amount: number, messg: string, digital_signature: t_hash) {
		this.nonce = nonce
		this.fr = fr
		this.to = to
		this.amount = amount
		this.digital_signature = digital_signature
		this.messg = messg
	}

}

module.exports = Transaction