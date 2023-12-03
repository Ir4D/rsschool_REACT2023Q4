import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateAgeR,
  updateCountryR,
  updateEmailR,
  updateGenderR,
  updateNameR,
  updatePswR,
  updateTermsR,
  updateImageR,
} from '../reducer';

import './pages.css';

type FormTypes = {
  nameR: string;
  ageR: number;
  emailR: string;
  pswR: string;
  pswRepR: string;
  genderR: string;
  termsR: string;
  countryR: string;
  imageR: string;
};

const FormReactHook = () => {
  const [imageR, setImageR] = useState<string | null>(null);

  const form = useForm<FormTypes>();
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageR(reader.result?.toString() || null);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected');
    }
  };

  const onSubmit = (data: FormTypes) => {
    console.log(data);

    dispatch(updateNameR(getValues('nameR')));
    dispatch(updateAgeR(getValues('ageR')));
    dispatch(updateEmailR(getValues('emailR')));
    dispatch(updatePswR(getValues('pswR')));
    dispatch(updateGenderR(getValues('genderR')));
    dispatch(updateTermsR(getValues('termsR')));
    dispatch(updateCountryR(getValues('countryR')));
    dispatch(updateImageR(imageR));

    navigate('/');

    errors;
  };

  return (
    <>
      <h1 className="form-title rHookForm-title">React Hook Form</h1>
      <div className="form rHookForm-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field form-name rHookForm-name">
            <label htmlFor="nameR">Name:</label>
            <input
              type="text"
              id="nameR"
              {...register('nameR', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
                pattern: {
                  value: /^[A-Z]/,
                  message: 'First letter must be uppercased',
                },
              })}
            />
            <p>{errors.nameR?.message}</p>
          </div>
          <div className="form-field form-age rHookForm-age">
            <label>Age:</label>
            <input
              type="number"
              id="ageR"
              {...register('ageR', {
                required: {
                  value: true,
                  message: 'Age is required',
                },
                pattern: {
                  value: /^[0-9]/,
                  message: 'Age should be a non-negative number',
                },
              })}
            />
            <p>{errors.ageR?.message}</p>
          </div>
          <div className="form-field form-email rHookForm-email">
            <label>Email:</label>
            <input
              type="email"
              id="emailR"
              {...register('emailR', {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format',
                },
                required: {
                  value: true,
                  message: 'Email is required',
                },
              })}
            />
            <p>{errors.emailR?.message}</p>
          </div>
          <div className="form-field form-psw rHookForm-psw">
            <label>Password:</label>
            <input type="password" id="pswR" {...register('pswR')} />
          </div>
          <div className="form-field form-pswRep rHookForm-pswRep">
            <label>Password repeat:</label>
            <input type="password" id="pswRepR" {...register('pswRepR')} />
          </div>
          <div className="form-field form-gender rHookForm-gender">
            <span>Gender:</span>
            <input
              type="radio"
              id="genderMale"
              value="Male"
              {...register('genderR')}
            />
            <label htmlFor="genderMale">Male</label>
            <input
              type="radio"
              id="genderFemale"
              value="Female"
              {...register('genderR')}
            />
            <label htmlFor="genderFemale">Female</label>
          </div>
          <div className="form-field form-terms rHookForm-terms">
            <label>Terms and Conditions</label>
            <input type="checkbox" id="termsR" {...register('termsR')} />
          </div>
          <div className="form-field form-img rHookForm-img">
            <label>Picture:</label>
            <input
              type="file"
              id="imageR"
              accept="image/png, image/jpeg"
              {...register('imageR')}
              onChange={(e) => {
                handleImage(e);
              }}
            />
          </div>
          <div className="form-field form-country rHookForm-country">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              placeholder="Enter your country"
              id="countryR"
              {...register('countryR')}
            />
          </div>
          <button className="form-field form-btn rHookForm-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormReactHook;
