import { createSlice } from '@reduxjs/toolkit';

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
