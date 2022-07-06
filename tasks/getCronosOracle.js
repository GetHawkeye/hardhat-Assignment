/**
 * Autor: joss
 * Date: 2022-07-06
 */

task("getCronosOracle", "Prints get CronosOracle BTC/USD price", async (taskArgs, hre) => {
   // get env provider
   const provider = await hre.ethers.provider;
   // The Contract interface
    let abi = [
        "function latestAnswer() external view returns (int256)"
    ];
    // The Contract Address
    let contractAddress = "0xb3DF0a9582361db08EC100bd5d8CB70fa8579f4B";
    // Connect Contract
    let contract = new ethers.Contract(contractAddress, abi, provider);
    console.log('Connect Contract %s is OK',contractAddress);
    // get latest Value
    let currentValue = await contract.latestAnswer();
    console.log("get CronosOracle BTC/USD latest Answer :%s" ,currentValue);
    let usdPrice = currentValue/100000000;
    console.log("BTC latest price is %s USD" ,usdPrice.toFixed(2));
});

