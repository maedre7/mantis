import notification from 'antd/lib/notification';
import {approve, approveDelegation, leverage, getTokens} from "../utils/index";
import {getBalances, getUserData} from './index';
import {TOKENS} from '../config/config';

const openNotification = (text) => {
	notification.open({
		placement: 'topLeft',
		duration: !text ? '2' : '5',
		message: <span style={{fontSize: '20px'}}>{!text ? 'Transaction initiated' : 'Transaction submitted'}</span>,
		description: <span style={{fontSize: '18px'}}>{!text ? 'Please accept the transaction using metamask.' : text}</span>,
		icon: <img src="/images/metamask.png" style={{height: '30px', width: '30px'}} alt="" />,
	});
};

export const _approve = (tokenIn, amount, func) => {
	return async(dispatch, getState) => { 
    const account = getState().account;
    openNotification();
		try{
      await approve(tokenIn, amount, account);
      func();
      openNotification('Approved tokens to Mantis!');
    }
    catch(e){
      console.log(e);
    }
  }
}

export const _approveDelegation = (tokenIn, borrow, mode, func) => {
	return async(dispatch, getState) => {
    const account = getState().account;
    openNotification();
		try{
      await approveDelegation(tokenIn, borrow, mode, account);
      func();
      openNotification('Approved Mantis to borrow on your behalf!');
    }
    catch(e){
      console.log(e);
    }
  }
}

export const _leverage = (tokenIn, leverageToken, amount, deposit, borrow, mode, func) => {
	return async(dispatch, getState) => {
    const account = getState().account;
    openNotification();
		try{
      await leverage(tokenIn, leverageToken, amount, deposit, borrow, mode, account);
      openNotification('Leveraged position created!');
      dispatch(getUserData());
      func();
    }
    catch(e){
      console.log(e);
    }
  }
}

export const _getTokens = (token, func) => {
	return async(dispatch, getState) => {
    const account = getState().account;
    openNotification();
    token = TOKENS[token];
		try{
      await getTokens(token, account);
      //func();
      openNotification('Received free tokens from faucet!');
      dispatch(getBalances(account));
    }
    catch(e){
      console.log(e);
    }
  }
}