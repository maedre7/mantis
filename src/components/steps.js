import React from 'react';
import Steps from 'antd/lib/steps';
import {approve, approveDelegation, leverage} from "../utils/index";

const {Step} = Steps;

const details = [
  {
    title: 'Approve',
    description: 'Approve tokens',
  },
  {
    title: 'Delegate',
    description: 'Approve delegation',
  },
  {
    title: 'Deposit',
    description: 'Deposit tokens',
  },
];

class StepsView extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      current: 0
    }
  }

  onChange = (current) => {
    this.setState(({
      current
    }));
  }

  next = () => {
    this.setState((prevState) => ({
      current: prevState.current + 1
    }));
  }

  changeLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }));
  }
  
  approve = async() => {
    const {tokenIn, amount, account} = this.props;
    this.changeLoading();
    try{
      await approve(tokenIn, amount, account);
      this.next();
    }
    catch(e){
      console.log(e);
    }
    this.changeLoading();
  }

  approveDelegation = async() => {
    const {tokenIn, borrow, mode, account} = this.props;
    this.changeLoading();
    try{
      await approveDelegation(tokenIn, borrow, mode, account);
      this.next();
    }
    catch(e){
      console.log(e);
    }
    this.changeLoading();
  }

  leverage = async() => {
    const {tokenIn, leverageToken, amount, deposit, borrow, mode, account} = this.props;
    this.changeLoading();
    try{
      await leverage(tokenIn, leverageToken, amount, deposit, borrow, mode, account);
      this.next();
    }
    catch(e){
      console.log(e);
    }
    this.changeLoading();
  }

  render(){

    return (
      <div id="steps-container">
        <Steps current={this.state.current} onChange={this.onChange}>
          {details.map((item, index) => (
            <Step key={item.title} title={item.title} description=""
            disabled={this.state.current < index} />
          ))}
        </Steps>
        <div>
          {this.state.current == 0 &&
          <div className="steps-content">
            <span>Approve tokens</span>
            <button onClick={this.approve}>Approve</button>
          </div>}
          {this.state.current == 1 &&
          <div className="steps-content">
            <span>Approve delegation</span>
            <button onClick={this.approveDelegation}>Approve</button>
          </div>}
          {this.state.current == 2 &&
          <div className="steps-content">
            <span>Deposit</span>
            <button onClick={this.leverage}>Deposit</button>
          </div>}
        </div>
      </div>
    );

  }

}

export default StepsView;
