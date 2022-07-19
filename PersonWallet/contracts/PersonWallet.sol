// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

contract PersonWallet {
    address payable public owner;

    constructor(address payable _owner) {
        owner = _owner;
    }

    modifier OnlyOwner {
        require(msg.sender == owner, 'NOT OWNER');
        _;
    }
    function deposit() external payable {}

    // will send ether to whoever
    function withdraw(address payable to, uint256 amount) external OnlyOwner returns (bool)  {
        (bool sent, ) = to.call{value: amount}("");
        require(sent == true, "Failed to send Ether");
        return sent;
    }

    function balanceOf() public view returns (uint) {
        return address(this).balance;
    }
}
