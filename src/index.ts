import hash from './lib/hash'
import { wallet, rsa_pub_key, rec_rsa_pub_key } from '../data/data'
import { Miner } from './lib/miner'
import create_transaction from './lib/create_transaction'
import chalk from 'chalk'

// const trs = create_transaction(rsa_pub_key, rsa_pub_key, 5)

const trs = wallet.create_transaction(5, rec_rsa_pub_key)

const miner = new Miner()

console.log(miner.utxo_set)

miner.verify_transaction(trs)

console.log(miner.utxo_set)

console.log(trs)