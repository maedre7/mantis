import {fetchBalances} from '../utils/index';

export const setBalances = (balances) => {
  return {
    type: 'SET_BALANCES',
    balances
  };
};

export const getBalances = () => {
  return async(dispatch, getState) => {
    try{
      const account = getState().account;
      const result = await fetchBalances(account);
      dispatch(setBalances(result));
    }
    catch(e){
      console.log(e);
    }
  }
}