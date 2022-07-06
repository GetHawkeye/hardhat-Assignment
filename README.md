# hardhat-Assignment

## Introduction
This project is a hardhat built project, included how to deploy a Multicall contract, Multicall contract, Read a smart contract, Write data to a smart contract.

## Environment configuration
1、The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/GetHawkeye/hardhat-Assignment.git
cd hardhat-Assignment
npm install
```
2、Editor **hardhat.config.js** file

> Change the value of the **PRIVATE_KEY** variable to your private key

3、Compiling contracts:
```sh
npx hardhat compile
```

4、Deploy contracts on the cronos-testnet3 network:
```sh
npx hardhat run scripts/deploy.js --network  cronos-testnet3
```

5、Editor **multicallWeather.js** file

> Change the value of  **proxyAddress** variable to the contract address deployed in step 4

## Assignment:

### Assignment 1: Read a smart contract.
> Run the following command to read data from the smart contract.
```sh
npx hardhat getCronosOracle --network cronos-mainnet
```
> The results are as follows：
```sh
Connect Contract 0xb3DF0a9582361db08EC100bd5d8CB70fa8579f4B is OK
get CronosOracle BTC/USD latest Answer :2002612428571
BTC latest price is 20026.12 USD
```

### Assignment 2: Write data to a smart contract.
> Run the following command to write data to the smart contract.
```sh
npx hardhat reportWeather --network cronos-testnet3
```
> The results are as follows：
```sh
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
```
### Additional Task

**Question 1**: If the API returns the temperature in a decimal form (like 27.5 C),
    how to submit this decimal number to the smart contract while keeping its precision?

> Answer：
> When the API of temperature is called, the returned result is multiplied by 1000 and saved to the contract.
> When the contract is read, the result is divided by 1000.

**Question 2**: How to store a negative temperature while keeping the current smart contract interface unchanged?

> Answer：
> When the API of temperature is called, The result is stripped of the negative sign Plus 100,000,000 and saved to the contract.
> When the contract is read, the result is Minus 100,000,000.


**Question 3**: During the "Step 3" in the task, it will take 3 JSON-RPC calls to
    read weather info for 3 cities from smart contract. Is it possbile to reduce
    that to only one request to get all the data back?

There are two solutions to this answer.

1) The first solution is to import the ethers.js toolkit to encode and decode the parameters
Call contract Multicall's aggregate method directly. See **multicallweather.js** for the code implementation. 

Run the following command:
```sh
npx hardhat multicallWeather --network cronos-testnet3

```
> The results are as follows：
```sh
Connect Contract 0x87fc3463eB5fBCe290d038a908Ec76Ee18DBC97B is OK
multicallWeather result:
shanghai temperature is: 31 °C
hongkong temperature is: 29 °C
london temperature is: 18 °C
```

2) The second solution is to import the @Makerdao /multicall.js toolkit and call the Aggregate or createWatcher methods. See **multicall1.js** or **multicall2.js** for the code implementation. 

Run the following command:
```sh
cd scripts
node multicall1.js

```

> The results are as follows：
```sh
Update: shanghai temperature is 31
Update: hongkong temperature is 29
Update: london temperature is 18
```
