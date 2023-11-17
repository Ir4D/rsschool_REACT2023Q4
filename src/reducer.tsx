const initialState = {
  term: '',
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'newTerm':
      return { ...state, term: action.payload };
    default:
      return state;
  }
};

export default reducer;
