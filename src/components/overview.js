import React from 'react';
import {round} from '../utils/index';

const Overview = (props) => {

  const {tokenIn, leverageToken, amount, deposit, borrow, price, leverageFactor} = props;
  console.log(tokenIn, leverageToken, amount, deposit, borrow, price);

  const collateral = deposit * price;

	return(
    <div id="overview">
      <h5>Position on Aave after transaction:</h5>
      <div id="overview-container">
        <div className="overview-box">
          <p>Collateral:</p>
          <div className="overview-value-container">
            <p>{round(collateral)}</p>
            <img className="overview-icon" src={`/images/${leverageToken.toLowerCase()}.svg`} />
          </div>
        </div>
        <div className="overview-box">
          <p>Borrow:</p>
          <div className="overview-value-container">
            <p>{round(borrow)}</p>
            <img className="overview-icon" src={`/images/${tokenIn.toLowerCase()}.svg`} />
          </div>
        </div>
        <div className="overview-box">
          <div className="overview-value-container">
            <img className="overview-icon-lev" src={`/images/${leverageToken.toLowerCase()}.svg`} />
            <p>leverage factor:</p>
          </div>
          <p><b>~{round(leverageFactor, 1)}x</b></p>
        </div>
      </div>
    </div>
  );
  
}

export default Overview;