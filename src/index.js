import Web3 from 'web3'
import Logger from './config/logger'
import sendEther from './transactions/send-ether'
import printBalances from './helpers/print-balances'
import printNonces from './helpers/print-nonces'
import './config/env'

const {
  PRIVATE_KEY_1: pk1,
  PRIVATE_KEY_2: pk2,
} = process.env

// Initialize web3
const web3 = new Web3('http://localhost:8545')

// Private key to account
const account1 = web3.eth.accounts.privateKeyToAccount(pk1)
const account2 = web3.eth.accounts.privateKeyToAccount(pk2)

// Create empty accounts
const account3 = web3.eth.accounts.create()
const account4 = web3.eth.accounts.create()

// Get addresses
const addresses = [account1.address, account2.address, account3.address, account4.address];

(async () => {
  try {
    // Print balances and nonces
    Logger.info('Initial state')
    printBalances(web3, addresses)
    printNonces(web3, addresses)
    // Get 10 ether to wei
    const ether = web3.utils.toWei('0.001')
    // Get transaction object to send ether from account 0 to account 2
    const sendEtherTransaction = sendEther(addresses[0], addresses[2], web3.utils.toHex(ether))
    // Sign transaction
    const signedTx = await account1.signTransaction(sendEtherTransaction)
    // Send signed transaction
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    Logger.info(`After sending ${web3.utils.fromWei(ether)} Eth`)
    printBalances(web3, addresses)
    printNonces(web3, addresses)
  } catch (error) {
    Logger.error(error)
  }
})()
