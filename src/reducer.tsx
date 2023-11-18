import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   term: '',
// };

// const reducer = (
//   state = initialState,
//   action: { type: string; payload: string }
// ) => {
//   switch (action.type) {
//     case 'newTerm':
//       return { ...state, term: action.payload };
//     default:
//       return state;
//   }
// };

// export default reducer;

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    term: '',
    resultsList: [],
  },
  reducers: {
    changeTerm(state, action) {
      state.term = action.payload;
    },
    changeResultList(state, action) {
      state.resultsList = action.payload;
      console.log(state.resultsList);
    },
  },
});

export default toolkitSlice.reducer;
export const { changeTerm, changeResultList } = toolkitSlice.actions;
