const initialState = {};

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRICES':
      return action.prices;         
    default:
      return state;  
  };
}
