import {getAccounts} from '../utils/index';

export const setAccount = (account) => {
  return {
    type: 'SET_ACCOUNT',
    account
  };
};

export const fetchAccount = () => {
  return async(dispatch) => {
    try{
      const result = await getAccounts();
      dispatch(setAccount(result));
    }
    catch(e){
      console.log(e);
    }
  }
}