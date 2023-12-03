import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateAge,
  updateCountry,
  updateEmail,
  updateGender,
  updateName,
  updatePsw,
  updateImage,
} from '../reducer';
import Autocomplete from '../components/Autocomplete';
import { useNavigate } from 'react-router-dom';

import './pages.css';

const FormUncontrComp: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPswRef = useRef<HTMLInputElement>(null);
  const inputPswRepRef = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputTerms = useRef<HTMLInputElement>(null);
  const inputCountryRef = useRef<HTMLInputElement>(null);
  const inputImage = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result?.toString() || null);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected');
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(updateName(inputNameRef.current?.value));
    dispatch(updateAge(inputAgeRef.current?.value));
    dispatch(updateEmail(inputEmailRef.current?.value));
    dispatch(updatePsw(inputPswRef.current?.value));
    dispatch(updateGender(inputGender.current?.value));
    dispatch(updateCountry(selectedCountry || ''));
    dispatch(updateImage(image));

    navigate('/');
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <h1 className="form-title uncontrForm-title">
        Uncontrolled components Form
      </h1>
      <div className="form uncontrForm-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field form-name uncontrForm-name">
            <label>Name:</label>
            <input type="text" name="name" ref={inputNameRef} />
          </div>
          <div className="form-field form-age uncontrForm-age">
            <label>Age:</label>
            <input type="number" name="age" ref={inputAgeRef} />
          </div>
          <div className="form-field form-email uncontrForm-email">
            <label>Email:</label>
            <input type="email" name="email" ref={inputEmailRef} />
          </div>
          <div className="form-field form-psw uncontrForm-psw">
            <label>Password:</label>
            <input type="password" name="psw" ref={inputPswRef} />
          </div>
          <div className="form-field form-pswRep uncontrForm-pswRep">
            <label>Password repeat:</label>
            <input type="password" name="pswRep" ref={inputPswRepRef} />
          </div>
          <div className="form-field form-gender uncontrForm-gender">
            <span>Gender:</span>
            <input
              type="radio"
              id="genderMale"
              name="gender"
              value="Male"
              ref={inputGender}
            />
            <label htmlFor="genderMale">Male</label>
            <input
              type="radio"
              id="genderFemale"
              name="gender"
              value="Female"
              ref={inputGender}
            />
            <label htmlFor="genderFemale">Female</label>
          </div>
          <div className="form-field form-terms uncontrForm-terms">
            <label>Terms and Conditions</label>
            <input type="checkbox" name="terms" ref={inputTerms} />
          </div>
          <div className="form-field form-img uncontrForm-img">
            <label>Picture:</label>
            <input
              type="file"
              name="image"
              ref={inputImage}
              accept="image/png, image/jpeg"
              onChange={(e) => {
                handleImage(e);
              }}
            />
          </div>
          <div className="form-field form-country uncontrForm-country">
            <label htmlFor="country">Country:</label>
            <Autocomplete
              ref={inputCountryRef}
              onSelectCountry={handleSelectCountry}
            />
          </div>
          <button className="form-field form-btn uncontrForm-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormUncontrComp;
