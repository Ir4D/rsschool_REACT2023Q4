import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  updateAge,
  updateCountry,
  updateEmail,
  updateGender,
  updateName,
  updatePsw,
  updatePswRep,
  updateTerms,
  updateImage,
} from '../reducer';
import Autocomplete from '../components/Autocomplete';

import './pages.css';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .test('is-uppercase', 'First letter must be uppercased', function (value) {
      return /^[A-Z]/.test(value || '');
    }),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age should be a positive number'),
  email: yup
    .string()
    .email('Email format is not valid')
    .required('Email is required'),
  psw: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character'
    ),
  pswRep: yup
    .string()
    .required('Password repeat is required')
    .oneOf([yup.ref('psw')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  terms: yup.boolean().oneOf([true], 'Acceptance of T&C is required'),
  image: yup.string().required('Image is required'),
});

const FormUncontrComp: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await schema.validate(
        {
          name: inputNameRef.current?.value,
          age: inputAgeRef.current?.value,
          email: inputEmailRef.current?.value,
          psw: inputPswRef.current?.value,
          pswRep: inputPswRepRef.current?.value,
          gender: inputGender.current?.value,
          terms: inputTerms.current?.checked,
          image: inputImage.current?.files?.[0],
        },
        { abortEarly: false }
      );

      dispatch(updateName(inputNameRef.current?.value));
      dispatch(updateAge(inputAgeRef.current?.value));
      dispatch(updateEmail(inputEmailRef.current?.value));
      dispatch(updatePsw(inputPswRef.current?.value));
      dispatch(updatePswRep(inputPswRepRef.current?.value));
      dispatch(updateGender(inputGender.current?.value));
      dispatch(updateTerms('Accepted'));
      dispatch(updateCountry(selectedCountry || ''));
      dispatch(updateImage(image));

      navigate('/');
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        const errors: Record<string, string> = {};
        error.inner.forEach((validationError: yup.ValidationError) => {
          if (validationError.path) {
            errors[validationError.path] = validationError.message;
          }
        });
        setValidationErrors(errors);
      } else {
        console.error(error);
      }
    }
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
            {validationErrors.name && (
              <p className="error-message">{validationErrors.name}</p>
            )}
          </div>
          <div className="form-field form-age uncontrForm-age">
            <label>Age:</label>
            <input type="number" name="age" ref={inputAgeRef} />
            {validationErrors.age && (
              <p className="error-message">{validationErrors.age}</p>
            )}
          </div>
          <div className="form-field form-email uncontrForm-email">
            <label>Email:</label>
            <input type="email" name="email" ref={inputEmailRef} />
            {validationErrors.email && (
              <p className="error-message">{validationErrors.email}</p>
            )}
          </div>
          <div className="form-field form-psw uncontrForm-psw">
            <label>Password:</label>
            <input type="password" name="psw" ref={inputPswRef} />
            {validationErrors.psw && (
              <p className="error-message">{validationErrors.psw}</p>
            )}
          </div>
          <div className="form-field form-pswRep uncontrForm-pswRep">
            <label>Password repeat:</label>
            <input type="password" name="pswRep" ref={inputPswRepRef} />
            {validationErrors.pswRep && (
              <p className="error-message">{validationErrors.pswRep}</p>
            )}
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
            {validationErrors.gender && (
              <p className="error-message">{validationErrors.gender}</p>
            )}
          </div>
          <div className="form-field form-terms uncontrForm-terms">
            <label>Terms and Conditions</label>
            <input type="checkbox" name="terms" ref={inputTerms} />
            {validationErrors.terms && (
              <p className="error-message">{validationErrors.terms}</p>
            )}
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
            {validationErrors.image && (
              <p className="error-message">{validationErrors.image}</p>
            )}
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
