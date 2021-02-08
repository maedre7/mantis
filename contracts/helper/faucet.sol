pragma solidity ^0.6.12;

interface IERC20 {
  function transfer(address, uint) external;
}

contract Faucet {
  
  constructor() public {
    
  }
  
  uint constant TOKEN_AMOUNT = 100 ether;
  uint constant ETHER_AMOUNT = 10 ether;
  
  event Received(address sender, uint amount);
  
  receive() external payable {
      emit Received(msg.sender, msg.value);
  }

  function getTokens(address token) public {
    IERC20(token).transfer(msg.sender, TOKEN_AMOUNT);
  }
  
  function getEthers() public {
    msg.sender.transfer(ETHER_AMOUNT);
  }

}