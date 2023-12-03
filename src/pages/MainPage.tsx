import { useSelector } from 'react-redux';

import './pages.css';

const MainPage = () => {
  const mainPageHeading = 'The Main Page';

  const {
    name,
    age,
    email,
    psw,
    gender,
    terms,
    country,
    image,
    nameR,
    ageR,
    emailR,
    pswR,
    genderR,
    termsR,
    countryR,
    imageR,
  } = useSelector(
    (state: {
      toolkit: {
        name: string;
        age: string;
        email: string;
        psw: string;
        gender: string;
        terms: string;
        country: string;
        image: string;
        nameR: string;
        ageR: string;
        emailR: string;
        pswR: string;
        genderR: string;
        termsR: string;
        countryR: string;
        imageR: string;
      };
    }) => state.toolkit
  );

  return (
    <div>
      <h1 className="main-title">{mainPageHeading}</h1>
      <div className="main-forms">
        <div className="main-formUncontrComp">
          <h3 className="main-formTitle">Uncontrolled components Form</h3>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Password: {psw}</p>
          <p>Gender: {gender}</p>
          <p>T&C: {terms}</p>
          <p>Country: {country}</p>
          {image && (
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: '100%' }}
              onError={(e) => console.error('Error loading image:', e)}
            />
          )}
        </div>
        <div className="main-formReactHooks">
          <h3 className="main-formTitle">React Hook Form</h3>
          <p>Name: {nameR}</p>
          <p>Age: {ageR}</p>
          <p>Email: {emailR}</p>
          <p>Password: {pswR}</p>
          <p>Gender: {genderR}</p>
          <p>T&C: {termsR}</p>
          <p>Country: {countryR}</p>
          {imageR && (
            <img
              src={imageR}
              alt="Uploaded"
              style={{ maxWidth: '100%' }}
              onError={(e) => console.error('Error loading image:', e)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
