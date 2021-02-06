import React from "react";
import {getAccounts, fetchBalances} from '../utils/index';
import {TOKENS} from '../config/config';

class Wallet extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      account: '',
      balances: []
    }
    this.symbols = Object.keys(TOKENS);
  }

  async componentDidMount(){
    try{
      const account = await getAccounts();
      const balances = await fetchBalances(account);
      this.setState(({
        account,
        balances
      }));
    }
    catch(e){
      console.log(e);
    }
  }

  render(){

    return(
      <div id="wallet-container">
        <h2 id="wallet-faucet-heading">Get free tokens</h2>
        <div id="wallet-faucet-container">
          <div id="wallet-faucet">
            <p>Dropdown</p>
            <button>Get tokens</button>
          </div>
        </div>
        <div id="wallet-list">
          {
            this.symbols.map((symbol, index) => (
              <div className="wallet-list-item">
                <div>
                  <img className="wallet-list-item-icon" src={`/images/${symbol.toLowerCase()}.svg`} />
                  <span>{symbol}</span>
                </div>
                <span>{this.state.balances[index]}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

}

export default Wallet;