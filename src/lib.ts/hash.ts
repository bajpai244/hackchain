import crypto from 'crypto'
import { t_hash_fn } from '../types'

const salt = 'my_hash_key'

const hash_fn: t_hash_fn = (block) => {

	const str = JSON.stringify(block)

	const hashing_algo = crypto.createHmac('sha256', salt)
	return hashing_algo.update(str).digest('hex')
}

module.exports = hash_fn