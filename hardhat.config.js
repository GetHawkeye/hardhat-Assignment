require("@nomiclabs/hardhat-waffle");
require("./tasks/getCronosOracle");
require("./tasks/reportWeather");
require("./tasks/multicallWeather");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const PRIVATE_KEY = "c2347ee52e0e18311b31b4e5e87ea73caf787d8e06d38c1bbe967b8b4e2068b6";
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [`${PRIVATE_KEY}`]
    },
    "cronos-testnet3": {
      url: "https://cronos-testnet-3.crypto.org:8545",
      accounts: [`${PRIVATE_KEY}`]
    },
    "cronos-mainnet": {
      url: "https://evm-cronos.crypto.org",
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};
