import fs from 'fs'
import { t_generate_keys_fn } from '../types'
import Wallet from "./wallet"

const wal = new Wallet

const public_key = wal.public_key.export({ type: 'pkcs1', format: "pem" })
const private_key = wal.private_key.export({ type: 'pkcs1', format: "pem" })

const generate_keys: t_generate_keys_fn = (user_name, test_mode = false) => {

	const base_path = test_mode ? `../data/keys` : `../../data/keys`

	fs.mkdirSync(__dirname + `${base_path}/${user_name}`, { recursive: true })

	fs.writeFileSync(__dirname + `${base_path}/${user_name}/public_key`, public_key)
	fs.writeFileSync(__dirname + `${base_path}/${user_name}/private_key`, private_key)
}

export default generate_keys