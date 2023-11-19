import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    searchTerm: '',
    resultsList: [],
    itemsOnPage: 12,
    itemsPerPage: 12,
    loadingMainPage: true,
    loadingDetailsPage: true,
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
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
    changeLoadingMainPage(state, action) {
      state.loadingMainPage = action.payload;
    },
    changeLoadingDetailsPage(state, action) {
      state.loadingDetailsPage = action.payload;
    },
  },
});

export default toolkitSlice.reducer;
export const {
  changeSearchTerm,
  changeResultList,
  changeItemsOnPage,
  changeItemsPerPage,
  changeLoadingMainPage,
  changeLoadingDetailsPage,
} = toolkitSlice.actions;
