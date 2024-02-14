export default () => ({
  tokenAddress: process.env.CONTRACT_ADDRESS,
  abiAddress: process.env.ABI_CONTRACT_ADDRESS,
  alchemyApiKey: process.env.ARB_MAINNET_ALCHEMY_KEY,
  arbscanApiKey: process.env.ARBSCAN_API_KEY,
});
