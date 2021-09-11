import fs from 'fs'
import test from 'tape'
import { isEmpty } from 'ramda'
import generate_keys from '../src/lib/generate_keys';
import get_keys from '../src/lib/get_keys'
import chalk from 'chalk'

test('checking key generation', async (t) => {
	t.plan(2)
	await clear_prev_file()
	generate_keys('test')

	const { public_key, private_key } = get_keys('test')

	t.false(isEmpty(public_key))
	t.false(isEmpty(private_key))

})


const clear_prev_file = async () => {
	try {
		await fs.rm(__dirname + '../data/keys/test', { force: true, recursive: true }, () => { })
	}
	catch (err) {
		console.log(chalk.blue(err))
	}
}