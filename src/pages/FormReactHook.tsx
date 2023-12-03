import { Resolver, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const schema = yup.object({
  nameR: yup
    .string()
    .required('Name is required')
    .test('is-uppercase', 'First letter must be uppercased', function (value) {
      return /^[A-Z]/.test(value || '');
    }),
  ageR: yup
    .number()
    .required('Age is required')
    .positive('Age should be a positive number'),
  emailR: yup
    .string()
    .email('Email format is not valid')
    .required('Email is required'),
  pswR: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character'
    ),
  pswRepR: yup
    .string()
    .required('Password repeat is required')
    .oneOf([yup.ref('pswR')], 'Passwords must match'),
  genderR: yup.string().required('Gender is required'),
  termsR: yup.boolean().oneOf([true], 'Acceptance of T&C is required'),
  countryR: yup.string().required('Country is required'),
  imageR: yup.string().required('Image is required'),
});

type FormTypes = {
  nameR: string;
  ageR: number;
  emailR: string;
  pswR: string;
  pswRepR: string;
  genderR: string;
  termsR: boolean;
  countryR: string;
  imageR: string | undefined;
};

const FormReactHook = () => {
  const [imageR, setImageR] = useState<string | null>(null);

  const form = useForm<FormTypes>({
    resolver: yupResolver(schema) as Resolver<FormTypes>,
  });
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
    dispatch(updateTermsR('Accepted'));
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
            <input type="text" id="nameR" {...register('nameR')} />
            <p>{errors.nameR?.message}</p>
          </div>
          <div className="form-field form-age rHookForm-age">
            <label>Age:</label>
            <input type="number" id="ageR" {...register('ageR')} />
            <p>{errors.ageR?.message}</p>
          </div>
          <div className="form-field form-email rHookForm-email">
            <label>Email:</label>
            <input type="email" id="emailR" {...register('emailR')} />
            <p>{errors.emailR?.message}</p>
          </div>
          <div className="form-field form-psw rHookForm-psw">
            <label>Password:</label>
            <input type="password" id="pswR" {...register('pswR')} />
            <p>{errors.pswR?.message}</p>
          </div>
          <div className="form-field form-pswRep rHookForm-pswRep">
            <label>Password repeat:</label>
            <input type="password" id="pswRepR" {...register('pswRepR')} />
            <p>{errors.pswRepR?.message}</p>
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
            <p>{errors.genderR?.message}</p>
          </div>
          <div className="form-field form-terms rHookForm-terms">
            <label>Terms and Conditions</label>
            <input type="checkbox" id="termsR" {...register('termsR')} />
            <p>{errors.termsR?.message}</p>
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
            <p>{errors.imageR?.message}</p>
          </div>
          <div className="form-field form-country rHookForm-country">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              placeholder="Enter your country"
              id="countryR"
              {...register('countryR')}
            />
            <p>{errors.countryR?.message}</p>
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
