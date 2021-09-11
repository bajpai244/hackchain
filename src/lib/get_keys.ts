import fs from "fs"
import { t_get_keys } from "../types"

const get_keys: t_get_keys = (user_name: string) => {
	const public_key = fs.readFileSync(__dirname + `../data/keys/${user_name}/public_key`, { encoding: 'utf8' })
	const private_key = fs.readFileSync(__dirname + `../data/keys/test/private_key`, { encoding: 'utf8' })

	return { public_key, private_key }
}

export default get_keys