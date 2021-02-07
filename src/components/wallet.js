import React from "react";
import {connect} from 'react-redux';
import Button from 'antd/lib/button';
import Dropdown from './dropdown';
import {fetchBalances, getTokens, fromWei} from '../utils/index';
import {TOKENS} from '../config/config';

class Wallet extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      token: 'DAI',
      balances: []
    }
    this.symbols = Object.keys(TOKENS);
  }

  async componentDidMount(){
    try{
      const balances = await fetchBalances(this.props.account);
      this.setState(({
        balances
      }));
    }
    catch(e){
      console.log(e);
    }
  }

  onSelect = (token) => {
    this.setState(({
      token
    }),() => console.log(this.state));
  }

  getFaucet = async() => {
    try{
      const token = TOKENS[this.state.token];
      await getTokens(token, this.props.account);
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
            <Dropdown tokens={TOKENS} mode='3' onSelect={this.onSelect} />
            <Button className="button wallet-button" onClick={this.getFaucet}>Get tokens</Button>
          </div>
        </div>
        <div id="wallet-list">
          {
            this.symbols.map((symbol, index) => (
              <div className="wallet-list-item" key={index}>
                <div>
                  <img className="wallet-list-item-icon" src={`/images/${symbol.toLowerCase()}.svg`} />
                  <span>{symbol}</span>
                </div>
                <span>{fromWei(this.state.balances[index])}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
	return{
		account: state.account,
	};
};

export default connect(mapStateToProps)(Wallet);