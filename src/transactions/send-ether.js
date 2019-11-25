const sendEther = (from, to, amount) => ({
  from,
  to,
  value: amount,
  gas: 200000,
  chainId: 7,
})

export default sendEther
