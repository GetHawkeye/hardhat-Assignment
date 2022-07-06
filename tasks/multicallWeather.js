/**
 * Autor: joss
 * Date: 2022-07-06
 */

task("multicallWeather", "multi call Weather contract", async (taskArgs, hre) => {
  // get a signer
  const [signer] = await hre.ethers.getSigners();
  const abi = [
    "function aggregate(tuple(address target, bytes callData)[] calls) returns (bytes[] returnData)"
  ];

  // The Contract Address
  let proxyAddress = "0x87fc3463eB5fBCe290d038a908Ec76Ee18DBC97B";

  // Connect Contract
  let contract = new ethers.Contract(proxyAddress, abi, signer);

  console.log('Connect Contract %s is OK', proxyAddress);

  let targetContractAddress = "0x49354813d8BFCa86f778DfF4120ad80E4D96D74E";
  let targetABI = [
    "function reportWeather(uint32 batchId, bytes32 cityName, uint32 temperature) external",
    "function getWeather(uint32 batchId, bytes32 cityName) public view returns (uint32)"
  ];
  let targetIface = new ethers.utils.Interface(targetABI);
  // build args
  const citys = ["shanghai", "hongkong", "london"];
  const calls = [
    {
      target: targetContractAddress,
      callData: targetIface.encodeFunctionData("getWeather", [1657076254, ethers.utils.formatBytes32String(citys[0])]),
    },
    {
      target: targetContractAddress,
      callData: targetIface.encodeFunctionData("getWeather", [1657076254, ethers.utils.formatBytes32String(citys[1])])
    },
    {
      target: targetContractAddress,
      callData: targetIface.encodeFunctionData("getWeather", [1657076254, ethers.utils.formatBytes32String(citys[2])])
    }  
   ];
  
  // call contract
  const result = await contract.callStatic.aggregate(calls);
  console.log("multicallWeather result:");
  for (let i = 0; i < citys.length; i++) {
    let data = targetIface.decodeFunctionResult("getWeather", result[i]);
    console.log("%s temperature is: %s °C" ,citys[i], data[0]);
  }

});

