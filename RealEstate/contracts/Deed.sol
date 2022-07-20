// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "./interfaces/IDeed.sol";

contract Deed {
    address public inspector;
    address public seller;
    address public buyer;
    address payable public owner;
    event PayOut(uint amount, uint when);

    constructor(address _inspector, address _seller, address _buyer) payable {}

    function PayDeed(uint256 amount) external {
        emit PayOut(amount, block.timestamp);
    }
    
    f
}
