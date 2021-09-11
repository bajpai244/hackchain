import { startsWith } from "ramda";
import { t_enc_key } from "../types";
import hash from './hash'
import crypto from 'crypto'
import Transaction from "./trasaction";

const create_transaction = (fr: t_enc_key, to: t_enc_key, amount: number) => {
	const hash_obj = { from: fr, to: to, amount: amount }

	const messg = hash(hash_obj)

	const digital_signature = crypto.sign("sha256", Buffer.from(messg), {
		key: to,
		padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	})

	const transaction = new Transaction(1, fr, to, amount, messg, digital_signature);
	return transaction
}

export default create_transaction