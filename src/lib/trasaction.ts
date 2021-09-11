import { t_address, t_digital_signature, t_enc_key, t_enc_key_obj, t_hash, t_hash_fn, t_transaction } from "../types";

class Transaction implements t_transaction {
	nonce: number;
	fr: t_enc_key_obj | t_enc_key;
	to: t_enc_key_obj | t_enc_key;
	amount: number;
	digital_signature: t_digital_signature;
	messg: string


	constructor(nonce: number, fr: t_enc_key_obj | t_enc_key, to: t_enc_key_obj | t_enc_key, amount: number, messg: string, digital_signature: t_digital_signature) {
		this.nonce = nonce
		this.fr = fr
		this.to = to
		this.amount = amount
		this.digital_signature = digital_signature
		this.messg = messg
	}

}

export default Transaction