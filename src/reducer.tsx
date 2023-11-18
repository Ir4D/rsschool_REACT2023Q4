// const initialState = {
//   term: '',
// };

import { createSlice } from '@reduxjs/toolkit';

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
  },
  reducers: {
    changeTerm(state, action) {
      state.term = action.payload;
    },
  },
});

export default toolkitSlice.reducer;
export const { changeTerm } = toolkitSlice.actions;
