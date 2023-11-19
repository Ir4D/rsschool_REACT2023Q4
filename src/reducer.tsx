import { createSlice } from '@reduxjs/toolkit';
// import { apiSlice } from './services/apiSlice';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    term: '',
    resultsList: [],
    itemsOnPage: 12,
    itemsPerPage: 12,
  },
  reducers: {
    changeTerm(state, action) {
      state.term = action.payload;
    },
    changeResultList(state, action) {
      state.resultsList = action.payload;
    },
    changeItemsOnPage(state) {
      state.itemsOnPage = state.resultsList.length;
    },
    changeItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
  },
});

export default toolkitSlice.reducer;
export const {
  changeTerm,
  changeResultList,
  changeItemsOnPage,
  changeItemsPerPage,
} = toolkitSlice.actions;
