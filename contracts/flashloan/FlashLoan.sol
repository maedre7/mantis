// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import { FlashLoanReceiverBase } from "./FlashLoanReceiverBase.sol";
import { ILendingPool, ILendingPoolAddressesProvider, IERC20 } from "./Interfaces.sol";
import { SafeMath } from "./Libraries.sol";

contract FlashLoan is FlashLoanReceiverBase {
	using SafeMath for uint256;

	address public OneInchExchange = address(0x111111125434b319222CdBf8C261674aDB56F3ae);

	constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) public {}

	/*
		Make a swap using 1inch
		args:
			_token: token to approve and swap
			_amount: amount to approve and swap
			_calldata: calldata from 1inch api
	*/
	function swap(address _token, uint _amount, bytes memory _calldata) internal {
    IERC20(_token).approve(OneInchExchange, _amount);
    (bool success,) = OneInchExchange.call{value: msg.value}(_calldata);
    require(success, '1INCH_SWAP_CALL_FAILED');
  }
	
	// Deposit swapped tokens as collateral and borrow against the collateral
	function swapAndDeposit(bytes memory _params) internal {
		(address tokenIn, address leverageToken, uint deposit, uint borrow, address depositor, uint mode, bytes memory _calldata) = abi.decode(_params, (address, address, uint, uint, address, uint, bytes));
		
		swap(tokenIn, deposit, _calldata);
		uint leverageTokenBalance = IERC20(leverageToken).balanceOf(address(this));
		LENDING_POOL.deposit(leverageToken, leverageTokenBalance, depositor, 0);
		borrow = borrow + (borrow * 9) / 10000;
		LENDING_POOL.borrow(tokenIn, borrow, mode, 0, depositor);  // tokenIn is to be borrowed back
	}
	
	function executeOperation(
	address[] calldata assets,
	uint256[] calldata amounts,
	uint256[] calldata premiums,
	address initiator,
	bytes calldata params
)
	external
	override
	returns (bool) {

		swapAndDeposit(params);

		for (uint i = 0; i < assets.length; i++) {
			uint amountOwing = amounts[i].add(premiums[i]);
			IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
		}

		return true;
	}
	
	function myFlashLoanCall(address _token, uint _amount, address _onBehalfOf, bytes memory _params) public {
		address receiverAddress = address(this);

		address[] memory assets = new address[](1);
		assets[0] = _token;

		uint256[] memory amounts = new uint256[](1);
		amounts[0] = _amount;

		// 0 = no debt, 1 = stable, 2 = variable
		uint256[] memory modes = new uint256[](1);
		modes[0] = 0;

		uint16 referralCode = 0;

		LENDING_POOL.flashLoan(
			receiverAddress,
			assets,
			amounts,
			modes,
			_onBehalfOf,
			_params,
			referralCode
	);
	}
}