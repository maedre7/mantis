const initialState = [];

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_BALANCES':
      return action.balances;         
    default:
      return state;  
  };
}
