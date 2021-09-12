import Wallet from "../src/lib/wallet"

export const wallet = new Wallet()
export const rsa_pub_key = wallet.public_key

export const wallet_1 = new Wallet()
export const rec_rsa_pub_key = wallet_1.public_key