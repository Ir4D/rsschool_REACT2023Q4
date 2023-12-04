import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    name: '',
    age: 0,
    email: '',
    psw: '',
    pswRep: '',
    gender: '',
    terms: '',
    country: '',
    countries: [],
    image: '',
    nameR: '',
    ageR: 0,
    emailR: '',
    pswR: '',
    pswRepR: '',
    genderR: '',
    termsR: '',
    countryR: '',
    countriesR: [],
    imageR: '',
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
    updateImage(state, action) {
      state.image = action.payload;
    },
    updateNameR(state, action) {
      state.nameR = action.payload;
    },
    updateAgeR(state, action) {
      state.ageR = action.payload;
    },
    updateEmailR(state, action) {
      state.emailR = action.payload;
    },
    updatePswR(state, action) {
      state.pswR = action.payload;
    },
    updatePswRepR(state, action) {
      state.pswRepR = action.payload;
    },
    updateGenderR(state, action) {
      state.genderR = action.payload;
    },
    updateTermsR(state, action) {
      state.termsR = action.payload;
    },
    updateCountryR(state, action) {
      state.countryR = action.payload;
    },
    updateCountriesR(state, action) {
      state.countriesR = action.payload;
    },
    updateImageR(state, action) {
      state.imageR = action.payload;
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
  updateImage,
  updateNameR,
  updateAgeR,
  updateEmailR,
  updatePswR,
  updatePswRepR,
  updateGenderR,
  updateTermsR,
  updateCountryR,
  updateCountriesR,
  updateImageR,
} = toolkitSlice.actions;
