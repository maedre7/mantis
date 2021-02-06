import React from "react";
import Select from "antd/lib/select";
import Input from "./input";
import Steps from './steps';
import Dropdown from './dropdown';
import Slider from './slider';
import {getAccounts} from '../utils/index';
import {TOKEN_CONFIG} from '../config/config';

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
      account: ''
    }
  }

  async componentDidMount(){
    try{
      const account = await getAccounts();
      this.changeState('account', account);
    }
    catch(e){
      console.log(e);
    }
  }

  open = () => {
    this.setState(({
      isOpen: true
    }));
  }

  close = () => {
    this.setState(({
      isOpen: false
    }));
  }

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  changeState = (key, value) => {
    this.setState(({
      [key]: value
    }), () => console.log(this.state));
  }

  render(){

    const maxLtv = TOKEN_CONFIG[this.state.tokenIn].baseLTVasCollateral / 10000;

    const {amount, mode, ltv} = this.state;
    const deposit =  amount / (1 - ltv);
    let borrow = deposit - amount;

    return(
      <div id="home">
        <div id="home-container">
          <div id="home-portal">
            <div id="home-portal-left">
              <div>
                <p>Input Token</p>
                <div className="home-portal-input">
                  <Input name={'Amount'} value={amount} placeholder="Enter amount" onInput={(val) => this.changeState('amount', val)} />
                  <Dropdown mode="1" onSelect={this.changeState} />
                </div>
              </div>
              <div>
                <p>Leverage Token</p>
                <div className="home-portal-input">
                  <Input name={'Output'} value={deposit} placeholder="Enter amount" />
                  <Dropdown mode="2" onSelect={this.changeState} />
                </div>
              </div>
              <div>
                <p>Interest mode</p>
                <Select defaultValue={'1'} size={'large'} style={{ width: 120 }} onChange={(val) => this.changeState('mode', val)}>
                  <Option style={{height: 50}} value="1">Stable</Option>
                  <Option style={{height: 50}} value="2">Borrow</Option>
                </Select>
              </div>
              <Slider value={this.state.ltv} maxLtv={maxLtv} onChange={this.changeState} />
              <button onClick={this.open}>Proceed</button>
            </div>
            <div id="home-portal-right"></div>
          </div>
          {this.state.isOpen && <Steps {...this.state} deposit={deposit} borrow={borrow} />}
        </div>
      </div>
    );
  }

}

export default Home;