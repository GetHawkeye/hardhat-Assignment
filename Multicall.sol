pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;
/**
 * Autor: joss
 * Date: 2022-07-06
 */
contract Multicall {

    struct Call {
        address target;
        bytes callData;
    }

    function aggregate(Call[] memory calls) public returns (bytes[] memory returnData) {
    
        returnData = new bytes[](calls.length);
        for(uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory ret) = calls[i].target.call(calls[i].callData);
            require(success, "Multicall aggregate: call failed");
            returnData[i] = ret;
        }
    }

}