import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    name: '',
    age: '',
    email: '',
    psw: '',
    pswRep: '',
    gender: '',
    terms: '',
    country: '',
    countries: [],
  },
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    updateAge(state, action) {
      state.age = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    updatePsw(state, action) {
      state.psw = action.payload;
    },
    updatePswRep(state, action) {
      state.pswRep = action.payload;
    },
    updateGender(state, action) {
      state.gender = action.payload;
    },
    updateTerms(state, action) {
      state.terms = action.payload;
    },
    updateCountry(state, action) {
      state.country = action.payload;
    },
    updateCountries(state, action) {
      state.countries = action.payload;
    },
  },
});

export default toolkitSlice.reducer;

export const {
  updateName,
  updateAge,
  updateEmail,
  updatePsw,
  updatePswRep,
  updateGender,
  updateTerms,
  updateCountry,
  updateCountries,
} = toolkitSlice.actions;
