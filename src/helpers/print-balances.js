import Logger from '../config/logger'

const printBalances = async (web3, addresses) => {
  const balancesPromises = []
  addresses.forEach((address) => {
    balancesPromises.push(web3.eth.getBalance(address))
  })
  const balances = await Promise.all(balancesPromises)
  balances.forEach((balance, balanceId) => {
    Logger.info(`${addresses[balanceId]}: Balance = ${web3.utils.fromWei(balance)} ether`)
  })
}

export default printBalances
