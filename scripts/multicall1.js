const { createWatcher } = require("@makerdao/multicall");
const { aggregate } = require("@makerdao/multicall");
const { ethers } = require("ethers");
let CONTRACT_ADDRESS = "0x49354813d8BFCa86f778DfF4120ad80E4D96D74E"
const citys = ["shanghai", "hongkong", "london"];
let batchId = 1657076254;
//  specified network config
const config = {
  rpcUrl: 'https://cronos-testnet-3.crypto.org:8545',
  multicallAddress: '0x2E20b73235cE8E941A35654c9d1D55DD057F83B9',
  interval: 1000
};
// build args
const calls = [
  {
      target: CONTRACT_ADDRESS,
      call: ['getWeather(uint32,bytes32)(uint32)', batchId, ethers.utils.formatBytes32String(citys[0])],
      returns: [[citys[0] + ' temperature is']]
  },
  {
      target: CONTRACT_ADDRESS,
      call: ['getWeather(uint32,bytes32)(uint32)', batchId, ethers.utils.formatBytes32String(citys[1])],
      returns: [[citys[1] + ' temperature is']]
  },
  {
      target: CONTRACT_ADDRESS,
      call: ['getWeather(uint32,bytes32)(uint32)', batchId, ethers.utils.formatBytes32String(citys[2])],
      returns: [[citys[2] + ' temperature is']]
  }
];

(async () => {
    const watcher = aggregate(
        calls,
        config
    );
    let result = await watcher;
    console.log(result.results.transformed);
})();
