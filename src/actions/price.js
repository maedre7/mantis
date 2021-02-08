import {fetchPrices} from '../utils/index';

export const setPrices = (prices) => {
  return {
    type: 'SET_PRICES',
    prices
  };
};

export const getPrices = () => {
  return async(dispatch) => {
    try{
      const result = await fetchPrices();
      dispatch(setPrices(result));
    }
    catch(e){
      console.log(e);
    }
  }
}