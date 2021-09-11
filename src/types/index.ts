import crypto from 'crypto'

export type t_hash = string

export type t_data = Object

export type t_hash_fn = (data: Object | t_block) => t_hash

export type t_address = Object

export type t_calc_merkle_root_fn = (transactions: Array<string>) => t_hash

export type t_enc_key_obj = crypto.KeyObject

export type t_enc_key = string | Buffer

export type t_digital_signature = Buffer  // can be made more narrower

export interface t_block {
	height: number;
	data: Object;
	timestamp: Date;
	miner: string;
	prev_block: t_block | null;
	prev_hash: t_hash | null;
	transactions: Array<t_transaction>;
	merkel_root: t_hash
	calculate_merkel_root(): void
}

export interface t_transaction {
	nonce: number;
	fr: t_enc_key_obj;
	to: t_enc_key_obj;
	amount: number;
	digital_signature: t_digital_signature;
	messg: string
}

export interface t_utxo {
	owner: t_enc_key,
	amount: number,
}

export interface t_miner {
	height: number;
	last_block: t_block | null;

	create_block(data: t_data, miner: string, transactions: Array<t_transaction>): void
	verify_transaction({ messg, fr: public_key, digital_signature }: t_transaction): void

}

export type t_generate_keys_fn = (username: string, test_mode?: boolean) => void

export type t_get_keys = (user_name: string) => { public_key: t_enc_key, private_key: t_enc_key }