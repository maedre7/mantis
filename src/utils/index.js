// check if should use embedded web3 itself
import Web3 from "web3";
import {PROTOCOL, TOKENS} from '../config/config';
import {TOKEN_ABI, DEBT_TOKEN_ABI, MANTIS_ABI} from "./abi";
import fetchCalldata from './swap';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export const getAccounts = (args) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await web3.eth.getAccounts();
			resolve(result[0]);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

// Approve tokenIn to Mantis
export const approve = (tokenIn, amount, account) => {
	tokenIn = TOKENS[tokenIn].underlyingAsset;
	amount = toWei(amount);
  const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenIn);
	const promise = new Promise(async(resolve, reject) => {
		try{
			await tokenContract.methods.approve(PROTOCOL.MANTIS, amount).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

// Fetch tokenIn allowance
export const fetchAllowance = (tokenIn, account) => {
	tokenIn = TOKENS[tokenIn].underlyingAsset;
  const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenIn);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await tokenContract.methods.allowance(account, PROTOCOL.MANTIS).call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

// Approve delegation
export const approveDelegation = (borrowToken, amount, mode, account) => {
	const debtToken = mode == 1 ? TOKENS[borrowToken].sToken : TOKENS[borrowToken].vToken;
	amount = toWei(amount);
	amount = amount + (amount * 9) / 10000
  const debtTokenContract = new web3.eth.Contract(DEBT_TOKEN_ABI, debtToken);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await debtTokenContract.methods.approveDelegation(PROTOCOL.MANTIS, amount).send({from: account});
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

// Fetch borrow allowance
export const fetchBorrowAllowance = (borrowToken, mode, account) => {
	const debtToken = mode == 1 ? TOKENS[borrowToken].sToken : TOKENS[borrowToken].vToken
  const debtTokenContract = new web3.eth.Contract(DEBT_TOKEN_ABI, debtToken);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await debtTokenContract.methods.borrowAllowance(account, PROTOCOL.MANTIS).call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

// Call leverage on Mantis
export const leverage = (tokenIn, leverageToken, amount, deposit, borrow, mode, account) => {
	tokenIn = TOKENS[tokenIn].underlyingAsset;
	leverageToken = TOKENS[leverageToken].underlyingAsset;
	amount = toWei(amount);
	deposit = toWei(deposit);
	borrow = toWei(borrow);
  const mantis = new web3.eth.Contract(MANTIS_ABI, PROTOCOL.MANTIS);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const calldata = await fetchCalldata(tokenIn, leverageToken, deposit, PROTOCOL.MANTIS);
			const result = await mantis.methods.leverage(tokenIn, leverageToken, amount, deposit, borrow, mode, calldata).send({from: account});
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fromWei = (amount) => {
	try{
		return Web3.utils.fromWei(amount.toString());
	}
	catch(e){
		console.log(e);
	}
}

export const toWei = (amount) => {
	try{
		return Web3.utils.toWei(amount.toString());
	}
	catch(e){
		console.log(e);
	}
}