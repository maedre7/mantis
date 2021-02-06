import axios from 'axios';

const url = "https://api.1inch.exchange/v2.0/swap";

const fetchCalldata = async(tokenIn, leverageToken, deposit, mantis_address) => {
  try{
    const response = await axios(url, {
      params: {
        fromTokenAddress: tokenIn,
        toTokenAddress: leverageToken,
        amount: deposit,  // Exchange total deposit to leverage token
        fromAddress: mantis_address,
        slippage: 5,
        disableEstimate: true
      }
    });
    const calldata = response.data.tx.data;
    console.log(calldata);
    return calldata;
  }
  catch(e){
    console.log(e);
  }
}

export default fetchCalldata;