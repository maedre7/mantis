import React from 'react';
import {connect} from 'react-redux';
import Steps from 'antd/lib/steps';
import Button from 'antd/lib/button';
import {_approve, _approveDelegation, _leverage} from "../actions/tx";
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
  
  approve = async() => {
    const {tokenIn, amount} = this.props;
    this.props.dispatch(_approve(tokenIn, amount, this.next));
  }

  approveDelegation = async() => {
    const {tokenIn, borrow, mode} = this.props;
    this.props.dispatch(_approveDelegation(tokenIn, borrow, mode, this.next));
  }

  leverage = async() => {
    const {tokenIn, leverageToken, amount, deposit, borrow, mode} = this.props;
    this.props.dispatch(_leverage(tokenIn, leverageToken, amount, deposit, borrow, mode, this.props.close));
  }

  render(){

    const {tokenIn, leverageToken} = this.props;

    return (
      <div id="steps-container">
        <Steps current={this.state.current} onChange={this.onChange}>
          {details.map((item, index) => (
            <Step key={item.title} title={item.title} description=""
             />
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

export default connect()(StepsView);
