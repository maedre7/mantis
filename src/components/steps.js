import React from 'react';
import Steps from 'antd/lib/steps';
import Button from 'antd/lib/button';
import {approve, fetchAllowance, approveDelegation, leverage} from "../utils/index";
import {TOKENS} from '../config/config';

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
    title: 'Leverage',
    description: 'Leverage on Aave',
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

  /*async componentDidMount(){
    const {tokenIn, account} = this.props;
    try{
      const allowance = await fetchAllowance(tokenIn, account);
      console.log('-------', allowance);
      if(allowance > 0){
        this.next();
      }
    }
    catch(e){
      console.log(e);
    }
  }*/

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

    const {tokenIn, leverageToken} = this.props;

    return (
      <div id="steps-container">
        <Steps current={this.state.current} onChange={this.onChange}>
          {details.map((item, index) => (
            <Step key={item.title} title={item.title} description=""
            disabled={this.state.current != index} />
          ))}
        </Steps>
        <div>
          {this.state.current == 0 &&
          <div className="steps-content">
            <span>Approve {tokenIn} to Mantis</span>
            <Button className="button" onClick={this.approve}>Approve</Button>
          </div>}
          {this.state.current == 1 &&
          <div className="steps-content">
            <span>Approve Mantis to borrow {tokenIn}</span>
            <Button className="button" onClick={this.approveDelegation}>Delegate</Button>
          </div>}
          {this.state.current == 2 &&
          <div className="steps-content">
            <span>Leverage {leverageToken} on Aave</span>
            <Button className="button" onClick={this.leverage}>Leverage</Button>
          </div>}
        </div>
      </div>
    );

  }

}

export default StepsView;
