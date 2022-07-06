/**
 * Autor: joss
 * Date: 2022-07-06
 */


const axios = require('axios');

task("reportWeather", "write weather data to smart contract", async (taskArgs, hre) => {
    
        const batchId = Date.parse(new Date())/1000;
        console.log("batchId is : " + batchId);
        //let tMap = new Map([['shanghai', 95], ['hongkong', 75], ['london', 85]]);
        const citys = ["shanghai", "hongkong", "london"];
        const tMap =  await getWeather(citys);
        console.log("getWeather res: ", tMap);
        // get a signer
        const [signer] = await hre.ethers.getSigners();
        // The Contract interface
        let abi = [
            "function reportWeather(uint32 batchId, bytes32 cityName, uint32 temperature) external",
            "function getWeather(uint32 batchId, bytes32 cityName) public view returns (uint32)"
        ];
        // The Contract Address
        let contractAddress = "0x49354813d8BFCa86f778DfF4120ad80E4D96D74E";

        // Connect Contract
        let contract = new ethers.Contract(contractAddress, abi, signer);
        console.log('Connect Contract %s is OK', contractAddress);
        console.log("----------------------- start report data ---------------------");
        // batch send tx
        let entries = tMap.entries();
        for([key, value] of entries ){
            let bytes32Key = ethers.utils.formatBytes32String(key);
            let tx = await contract.reportWeather(batchId, bytes32Key, value);
            console.log("%s report result: %s", key, tx.hash);
            await tx.wait();
        }
       console.log("------------------------- write data end ------------------------");
       let keys = tMap.keys();
       for(key of keys ){
            let bytes32Key = ethers.utils.formatBytes32String(key);
            let result = await contract.getWeather(batchId, bytes32Key);
            console.log("getWeather %s  temperature is: %s °C", key, result);
        }
        console.log("----------------------- - query data end ------------------------");
});


async function getWeather(citys) {
    let map = new Map();
    for (var i = 0; i < citys.length; i++) {
        const res = await axios.get('https://goweather.herokuapp.com/weather/' + citys[i]);
        let temperature = parseInt((res.data.temperature || '').match(/\d+/g)[0]);
        map.set(citys[i], temperature);
    }
    return map;
}

