export type t_hash = string

export type t_hash_fn = (block: t_block) => string

export interface t_block {
	height: number;
	data: Object;
	timestamp: Date;
	miner: string;
	prev_block: t_block;
	prev_hash: t_hash;
	transactions: Array<string>;
	merkel_root: t_hash
	calculate_merkel_root(): void
}