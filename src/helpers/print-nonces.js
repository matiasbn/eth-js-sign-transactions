import Logger from '../config/logger'

const printNonces = async (web3, addresses) => {
  const noncePromises = []
  addresses.forEach((address) => {
    noncePromises.push(web3.eth.getTransactionCount(address))
  })
  const nonces = await Promise.all(noncePromises)
  nonces.forEach((nonce, nonceId) => {
    Logger.info(`${addresses[nonceId]}: Nonce = ${nonce}`)
  })
}

export default printNonces
