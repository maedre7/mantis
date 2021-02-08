pragma solidity ^0.6.12;

import {IERC20} from '../flashloan/Interfaces.sol';

contract Exchange {

  constructor() public {}
  
  address public token = address(0x6B175474E89094C44Da98b954EedeAC495271d0F);
  address public OneInch = address(0x111111125434b319222CdBf8C261674aDB56F3ae);
  
  function swap(uint _amount, bytes memory _calldata) public payable {
    IERC20(token).approve(OneInch, _amount);
    (bool success,) = OneInch.call{value: msg.value}(_calldata);
    require(success, '1INCH_SWAP_CALL_FAILED');
  }

}