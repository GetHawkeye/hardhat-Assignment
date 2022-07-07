const ethers = require('ethers');
async function test() {
  // get a signer
  //let provider = ethers.getDefaultProvider("rinkeby");

  const url = "https://cronos-testnet-3.crypto.org:8545";
  const provider = new ethers.providers.JsonRpcProvider(url);
  const abi = [
    "function aggregate(tuple(address target, bytes callData)[] calls) returns (uint256 blockNumber, bytes[] returnData)"
  ];

  // The proxy Contract Address
  let proxyAddress = "0x2E20b73235cE8E941A35654c9d1D55DD057F83B9";

  // The target Contract Address
  let targetContractAddress = "0xCD156974a006BEB8D67a7C1155FfF5c141C6e82e";

  let privateKey = '你的私钥';

  let wallet = new ethers.Wallet(privateKey, provider);
  // Connect Contract
  let contract = new ethers.Contract(proxyAddress, abi, provider);

  let contractWithSigner = contract.connect(wallet);

  console.log('Connect Contract %s is OK', proxyAddress);

  //let address1 = '0x34c9C5B758228C146B293CE5Ad88357CacE9ab37';
  let address2 = '0xaA39D6A245f83e496D11007312BbA38F254d5c55';
  let address3 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  let targetABI = [
    "function send(address receiver, uint amount)",
    "function getBalance(address addr) public view returns (uint balance)"
  ];
  let targetIface = new ethers.utils.Interface(targetABI);

  const calls = [
    {
      target: targetContractAddress,
      callData: targetIface.encodeFunctionData("send", [address2, 2000]),
    },
    {
      target: targetContractAddress,
      callData: targetIface.encodeFunctionData("send", [address3, 6000]),
    }
  ];

  //const result = await contractWithSigner.aggregate(calls,{ gasLimit: 600000 });

  const result = await contractWithSigner.aggregate(calls);
  console.log("tx:" + result.hash);
  //console.log("send:"+JSON.stringify(result, null, ' '));

}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
