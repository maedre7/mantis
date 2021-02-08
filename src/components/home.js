import React from 'react';
import {connect} from 'react-redux';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';
import Input from "./input";
import Steps from './steps';
import Dropdown from './dropdown';
import Slider from './slider';
import Status from './status';
import Overview from './overview';
import {getBalances, getPrices} from "../actions/index";
import {TOKENS, TOKEN_CONFIG} from '../config/config';

const { Option } = Select;

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tokenIn: 'DAI',
      leverageToken: 'WETH',
      amount: '',
      mode: '1',
      ltv: '0.5',
      isOpen: false,
    }
  }

  async componentDidMount(){
    try{
      this.props.dispatch(getBalances());
      this.props.dispatch(getPrices());
    }
    catch(e){
      console.log(e);
    }
  }

  open = () => {
    const {tokenIn, leverageToken, amount} = this.state;
    if(tokenIn == leverageToken){
      Message.error('Cannot leverage against same token!');
    }
    else if(amount){
      this.setState(({
        isOpen: true
      }));
    }
    else{
      Message.error('Please enter amount.');
    }
  }

  close = () => {
    this.setState(({
      isOpen: false
    }));
  }

  changeState = (key, value) => {
    this.setState(({
      [key]: value
    }), () => console.log(this.state));
  }

  calcPrice = () => {
    const {tokenIn, leverageToken} = this.state;
    const {prices} = this.props;
    if(Object.keys(prices).length > 0){
      const priceTokenIn = prices[TOKENS[tokenIn]]['usd'] || 1;
      const priceTokenOut = prices[TOKENS[leverageToken]]['usd'];
      return priceTokenIn/priceTokenOut;
    }
    else {
      return '1';
    }
  }

  render(){

    const maxLtv = TOKEN_CONFIG[this.state.leverageToken].baseLTVasCollateral / 10000;

    const price = this.calcPrice();

    const {amount, mode, ltv} = this.state;
    const leverageFactor = 1/(1 - ltv);
    const deposit =  amount * leverageFactor;
    const borrow = deposit - amount;
    
    console.log('-----------');
    console.log(amount)
    console.log(deposit)
    console.log(borrow)

    return(
      <div id="home">
        <div id="home-container">
          <div id="home-portal">
            <div id="home-portal-left">
            <div>
              <h6>Leverage Token</h6>
              <div className="home-portal-input">
                <Dropdown tokens={TOKENS} mode="2" onSelect={this.changeState} />
              </div>
              </div>
              <div>
                <h6>Leverage against</h6>
                <div className="home-portal-input">
                  <Input name={'Amount'} value={amount} placeholder="Enter amount" onInput={(val) => this.changeState('amount', val)} />
                  <Dropdown tokens={TOKENS} mode="1" onSelect={this.changeState} />
                </div>
              </div>
              <div>
                <h6>Interest mode</h6>
                <Select defaultValue={'1'} size={'large'} style={{ width: 120 }} onChange={(val) => this.changeState('mode', val)}>
                  <Option style={{height: 50}} value="1">Stable</Option>
                  <Option style={{height: 50}} value="2">Variable</Option>
                </Select>
              </div>
              <div>
                <h6>Loan to value ratio:</h6>
                <Slider value={this.state.ltv} maxLtv={maxLtv} onChange={this.changeState} />
              </div>
              <Button className="button" onClick={this.open}>Proceed</Button>
            </div>
            <div id="home-portal-right">
              <Overview {...this.state} price={price} deposit={deposit} borrow={borrow} leverageFactor={leverageFactor} />
            </div>
            <div id="home-portal-positions">
              <Status />
            </div>
          </div>
          {this.state.isOpen && <Steps {...this.state} deposit={deposit} borrow={borrow} close={this.close} />}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
	return{
		account: state.account,
    balance: state.balance,
		prices: state.price
	};
};

export default connect(mapStateToProps)(Home);