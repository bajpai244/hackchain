import { t_utxo } from '../src/types/index'
import { rsa_pub_key } from './data'

const init_utxo_set: Array<t_utxo> = [{ owner: rsa_pub_key, amount: 3 }, { owner: rsa_pub_key, amount: 8 }]

export default init_utxo_set