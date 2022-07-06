# hardhat-Assignment


## Quick start
1、The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/GetHawkeye/hardhat-Assignment.git
cd hardhat-Assignment
npm install
```

2、Compiling contracts:
```sh
npx hardhat compile
```

3、Deploy contracts on the cronos-testnet3 network:
```sh
npx hardhat run scripts/deploy.js --network  cronos-testnet3
```

4、Run Task:
```sh
npx hardhat getCronosOracle --network cronos-mainnet

npx hardhat reportWeather --network cronos-testnet3

npx hardhat multicallWeather --network cronos-testnet3

```
