import React from 'react';
import {fromWei} from '../utils/index';

const Status = (props) => {

  const {deposits, borrows} = props;
  const ifDeposits = deposits.length > 0;
  const ifBorrows = borrows.length > 0;

	return(
    <div id="status">
      <div id="status-container">
        <h5>User position on Aave</h5>
        <div id="status-container-top">
          <h6>Current deposits</h6>
          {ifDeposits ?
            deposits.map((deposit) => (
              <div>
                <img className="status-icon" src={`/images/${deposit.symbol.toLowerCase()}.svg`} />
                <span className="status-amount">{fromWei(deposit.amount)}</span>
              </div>
            )) : <p>No deposits</p>
          }
        </div>
        <div id="status-container-bottom">
          <h6>Current borrows</h6>
        {ifBorrows ?
          borrows.map((borrow) => (
            <div>
              <img className="status-icon" src={`/images/${borrow.symbol.toLowerCase()}.svg`} />
              <span className="status-amount">{fromWei(borrow.amount)}</span>
            </div>
          )) : <p>No borrows</p>}
        </div>
      </div>
    </div>
  );
  
}

export default Status;