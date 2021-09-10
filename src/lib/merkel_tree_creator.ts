import { t_calc_merkle_root_fn } from "../types"

const hash = require('./hash')

const merkel_root: t_calc_merkle_root_fn = (transactions) => {

	let trs = transactions

	while (trs.length != 1) {

		if (trs.length % 2 != 0) {
			trs.push(trs[trs.length - 1])
		}

		const temp_arr = []
		let idx = 0

		for (idx = 0; idx < trs.length; idx += 2) {
			const hash_1 = hash(trs[idx])
			const hash_2 = hash(trs[idx + 1])

			temp_arr.push(hash(hash_1 + hash_2))
		}

		trs = temp_arr
	}

	return trs[0]
}

module.exports = merkel_root