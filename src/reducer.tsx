import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    searchTerm: '',
    resultsList: [],
    itemsPerPage: 12,
    loadingMainPage: false,
    loadingDetailsPage: false,
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    changeResultList(state, action) {
      state.resultsList = action.payload;
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
  changeItemsPerPage,
  changeLoadingMainPage,
  changeLoadingDetailsPage,
} = toolkitSlice.actions;
