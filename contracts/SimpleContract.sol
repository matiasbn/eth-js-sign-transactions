pragma solidity ^0.5.8;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
contract SimpleContract is Ownable{
    uint256 public publicValue = 0;
    uint256 private privateValue = 0;

    function setPrivateValue(uint256 newValue) public onlyOwner{
        privateValue = newValue;
    }
    function getPrivateValue() public view onlyOwner returns (uint256){
        return privateValue;
    }
    function setPublicValue(uint256 newValue) public{
        publicValue = newValue;
    }
}