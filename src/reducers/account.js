const initialState = '';

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return action.account;         
    default:
      return state;  
  };
}
