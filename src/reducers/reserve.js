const initialState = {deposits: [], borrows: []};

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_RESERVES':
      return action.reserves;         
    default:
      return state;  
  };
}
