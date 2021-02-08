// check if should use embedded web3 itself
import axios from "axios";
import Web3 from "web3";
import {PROTOCOL, TOKENS, TOKEN_CONFIG} from '../config/config';
import {TOKEN_ABI, DEBT_TOKEN_ABI, MANTIS_ABI, BALANCE_CHECKER_ABI, FAUCET_ABI, DATA_PROVIDER_ABI} from "./abi";
import fetchCalldata from './swap';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export const enableMetamask = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await window.ethereum.enable();
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getNetwork = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const chainId = await web3.eth.net.getId();
			if(chainId == 31337){
				resolve();
			}
			else{
				reject();
			}
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

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
	tokenIn = TOKENS[tokenIn];
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
	tokenIn = TOKENS[tokenIn];
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
	const debtToken = mode == 1 ? TOKEN_CONFIG[borrowToken].sToken : TOKEN_CONFIG[borrowToken].vToken;
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
	const debtToken = mode == 1 ? TOKEN_CONFIG[borrowToken].sToken : TOKEN_CONFIG[borrowToken].vToken
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
	tokenIn = TOKENS[tokenIn];
	leverageToken = TOKENS[leverageToken];
	amount = toWei(amount);
	deposit = toWei(deposit);
	borrow = toWei(borrow);
  const mantis = new web3.eth.Contract(MANTIS_ABI, PROTOCOL.MANTIS);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const calldata = await fetchCalldata(tokenIn, leverageToken, deposit, PROTOCOL.MANTIS);
			const result = await mantis.methods.leverage(tokenIn, leverageToken, amount, deposit, borrow, mode, calldata).send({from: account, gasLimit: '1582646'});  //982646
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fetchBalances = (account) => {
  const balanceChecker = new web3.eth.Contract(BALANCE_CHECKER_ABI, PROTOCOL.BALANCE_CHECKER);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const tokens = Object.values(TOKENS);
			const result = await balanceChecker.methods.balances([account], tokens).call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getTokens = (token, account) => {
  const faucet = new web3.eth.Contract(FAUCET_ABI, PROTOCOL.FAUCET);
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await faucet.methods.getTokens(token).send({from: account, gasLimit: '389170'});
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fetchUserData = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const tokens = Object.values(TOKENS);
			const symbols = Object.keys(TOKENS);
  		const dataProvider = new web3.eth.Contract(DATA_PROVIDER_ABI, PROTOCOL.DATA_PROVIDER);
			const reserves = await dataProvider.methods.getUserReservesData(tokens,  account).call();
			console.log(reserves);
			const result = reserves.reduce((obj, reserve, index) => {
				const {currentATokenBalance, currentStableDebt, currentVariableDebt} = reserve;
				console.log(currentATokenBalance, currentStableDebt, currentVariableDebt);
				if(currentATokenBalance > 0){
					obj.deposits.push({
						symbol: symbols[index],
						amount: currentATokenBalance
					});
				}
				else if(currentStableDebt > 0 || currentVariableDebt > 0){
					obj.borrows.push({
						symbol: symbols[index],
						amount: currentStableDebt + currentVariableDebt
					});
				}
				return obj;
			}, {deposits: [], borrows: []});
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fetchPrices = () => {
	const tokens = Object.values(TOKENS).toString();
	const promise = new Promise(async(resolve, reject) => {
		const url = 'https://api.coingecko.com/api/v3/simple/token_price/ethereum';
		try{
			let result = await axios(url, {
				params: {
					contract_addresses: tokens,
					vs_currencies: 'usd'
				}
			});
			resolve(result.data);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fromWei = (amount) => {
	try{
		if(amount != undefined){
			return round(Web3.utils.fromWei(amount.toString()));
		}
		else{
			return '0';
		}
	}
	catch(e){
		console.log(e);
	}
}

export const toWei = (amount) => {
	try{
		if(amount != undefined){
			return Web3.utils.toWei(amount.toString());
		}
		else{
			return '0';
		}
	}
	catch(e){
		console.log(e);
	}
}

export const round = (number, digits=3) => {
	const _number = 10 ** digits;
  return Math.floor(number * _number)/_number;
}