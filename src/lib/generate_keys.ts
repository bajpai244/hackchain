import fs from 'fs'
import { t_generate_keys_fn } from '../types'
import Wallet from "./wallet"

const wal = new Wallet

const public_key = wal.public_key.export({ type: 'pkcs1', format: "pem" })
const private_key = wal.private_key.export({ type: 'pkcs1', format: "pem" })

const generate_keys: t_generate_keys_fn = (user_name: string) => {

	fs.mkdirSync(`../../data/keys/${user_name}`)

	fs.writeFileSync(__dirname + `../../data/keys/${user_name}/public_key`, public_key)
	fs.writeFileSync(__dirname + `../data/keys/${user_name}/private_key`, private_key)
}

export default generate_keys