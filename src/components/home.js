import React from 'react';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';
import Input from "./input";
import Steps from './steps';
import Dropdown from './dropdown';
import Slider from './slider';
import Status from './status';
import Overview from './overview';
import {getAccounts, fetchUserData, fetchPrices, round} from '../utils/index';
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
      account: '',
      deposits: [],
      borrows: [],
      prices: []
    }
  }

  async componentDidMount(){
    try{
      const account = await getAccounts();
      this.changeState('account', account);
      const result = await fetchUserData(account);
      const {deposits, borrows} = result;
      const prices = await fetchPrices();
      this.setState(({
        deposits: deposits,
        borrows: borrows
      }));
      this.prices = prices;
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
    if(this.prices != undefined){
      const priceTokenIn = this.prices[TOKENS[tokenIn]]['usd'] || 1;
      const priceTokenOut = this.prices[TOKENS[leverageToken]]['usd'];
      return priceTokenIn/priceTokenOut;
    }
    else {
      return 1;
    }
  }

  render(){

    const maxLtv = TOKEN_CONFIG[this.state.tokenIn].baseLTVasCollateral / 10000;

    const price = this.calcPrice();

    const {amount, mode, ltv} = this.state;
    const leverageFactor = 1/(1 - ltv);
    const deposit =  amount * leverageFactor;
    const borrow = deposit - amount;

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
                  <Option style={{height: 50}} value="2">Borrow</Option>
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
              <Status deposits={this.state.deposits} borrows={this.state.borrows} />
            </div>
          </div>
          {this.state.isOpen && <Steps {...this.state} deposit={deposit} borrow={borrow} />}
        </div>
      </div>
    );
  }

}

export default Home;