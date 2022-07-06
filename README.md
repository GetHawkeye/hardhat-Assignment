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
```
The results are as follows：
> Connect Contract 0xb3DF0a9582361db08EC100bd5d8CB70fa8579f4B is OK
> get CronosOracle BTC/USD latest Answer :2002612428571
> BTC latest price is 20026.12 USD

```sh
npx hardhat reportWeather --network cronos-testnet3
```
The results are as follows：
batchId is : 1657091807
getWeather res:  Map(3) { 'shanghai' => 35, 'hongkong' => 30, 'london' => 15 }
Connect Contract 0x49354813d8BFCa86f778DfF4120ad80E4D96D74E is OK
----------------------- start report data ---------------------
shanghai report result: 0xa90dacc230464cb6d8a780eaf18592dd99f6cf6c20e9060f63cd6885f55545d9
hongkong report result: 0xfad58341b068fad1241489bef5b89135e3fb935555947af58815dd3920eb8a42
london report result: 0x99457c3d203b03546c4c7f11b978cc2291ef73f6074fa497e8ee282ef07a2c9c
------------------------- write data end ------------------------
getWeather shanghai  temperature is: 35 °C
getWeather hongkong  temperature is: 30 °C
getWeather london  temperature is: 15 °C
----------------------- - query data end ------------------------

```sh
npx hardhat multicallWeather --network cronos-testnet3

```
