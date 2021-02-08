import {fetchUserData} from '../utils/index';

export const setReserves = (reserves) => {
  return {
    type: 'SET_RESERVES',
    reserves
  };
};

export const getUserData = () => {
  return async(dispatch, getState) => {
    try{
      const account = getState().account;
      const result = await fetchUserData(account);
      dispatch(setReserves(result));
    }
    catch(e){
      console.log(e);
    }
  }
}