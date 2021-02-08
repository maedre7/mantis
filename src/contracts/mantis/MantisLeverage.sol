// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import '../flashloan/FlashLoan.sol';
import { IERC20 } from '../flashloan/Interfaces.sol';

contract MantisLeverage is FlashLoan {

  constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoan(_addressProvider) public {}

  uint256 constant PERCENTAGE_FACTOR = 1e2;

  function leverage(address _tokenIn, address _leverageToken, uint _amountIn, uint _deposit, uint _borrow, uint _mode, bytes memory _calldata) public payable {
    require(_tokenIn != address(0));
    require(_leverageToken != address(0));

    // get tokens from user
    require(IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn), "TransferFrom failed");

    // approve total deposit to LP
    IERC20(_leverageToken).approve(address(LENDING_POOL), _deposit);

    bytes memory params = abi.encode(_tokenIn, _leverageToken, _deposit, _borrow, msg.sender, _mode, _calldata);
    FlashLoan.myFlashLoanCall(_tokenIn, _borrow, msg.sender, params);
    emit Leverage(msg.sender, _tokenIn, _leverageToken, _amountIn, _deposit);
  }

  event Leverage(address user, address tokenIn, address leverageToken, uint amountIn, uint deposit);

}