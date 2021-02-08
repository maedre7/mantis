pragma solidity ^0.8.0;
//pragma experimental ABIEncoderV2;;

interface IProtocolDataProvider {
  function getUserReserveData(address asset, address user)
  external
  view
  returns (
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint40,
    bool
  );
}

contract DataProvider {
    
  constructor() public {
      
  }
  
  struct UserReserveData {
      uint256 currentATokenBalance;
      uint256 currentStableDebt;
      uint256 currentVariableDebt;
  }
  
  address constant ADDRESS = address(0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d);
  
  function getUserReserveData(address token, address user) public view returns(UserReserveData memory userReserveData){
      (uint256 currentATokenBalance,
        uint256 currentStableDebt,
        uint256 currentVariableDebt,
        uint256 principalStableDebt,
        uint256 scaledVariableDebt,
        uint256 stableBorrowRate,
        uint256 liquidityRate,
        uint40 stableRateLastUpdated,
        bool usageAsCollateralEnabled
      ) = IProtocolDataProvider(ADDRESS).getUserReserveData(token, user);
      userReserveData = UserReserveData(currentATokenBalance, currentStableDebt, currentVariableDebt);
  }
  
  function getUserReservesData(address[] memory tokens, address user) public view returns(UserReserveData[] memory data){
      data = new UserReserveData[](tokens.length);
      for(uint i = 0; i < tokens.length; i++) {
          if(tokens[i] != address(0x0)){ 
            UserReserveData memory userReserveData = getUserReserveData(tokens[i], user);
            data[i] = userReserveData;
          }
      }
      return data;
  }
  
}