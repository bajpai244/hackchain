import hash from './lib/hash'
import Wallet from './lib/wallet'
import { Miner } from './lib/miner'


const wallet = new Wallet()

const trs = wallet.create_transaction(5)

const miner = new Miner()

miner.verify_transaction(trs)

console.log(trs)