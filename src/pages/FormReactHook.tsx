import { Resolver, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
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
import Autocomplete from '../components/Autocomplete';

const schema = yup.object({
  nameR: yup
    .string()
    .required('Name is required')
    .test('is-uppercase', 'First letter must be uppercased', function (value) {
      return /^[A-Z]/.test(value || '');
    }),
  // ageR: yup
  //   .number()
  //   .required('Age is required')
  //   .positive('Age should be a positive number'),
  ageR: yup
    .number()
    .typeError('Age must be a number')
    .transform((originalValue) => {
      const trimmedValue = String(originalValue).trim();
      return trimmedValue === '' ? undefined : parseInt(trimmedValue, 10);
    })
    .required('Age is required')
    .positive('Age should be a positive number')
    .integer('Age should be an integer'),
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
  imageR: string | undefined;
};

const FormReactHook = () => {
  const [imageR, setImageR] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const form = useForm<FormTypes>({
    resolver: yupResolver(schema) as Resolver<FormTypes>,
  });
  const { register, handleSubmit, formState } = form;
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

  const inputCountryRef = useRef<HTMLInputElement>(null);
  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
  };

  const onSubmit = async (data: FormTypes) => {
    try {
      await schema.validate(data, { abortEarly: false });

      dispatch(updateNameR(data.nameR));
      dispatch(updateAgeR(data.ageR));
      dispatch(updateEmailR(data.emailR));
      dispatch(updatePswR(data.pswR));
      dispatch(updateGenderR(data.genderR));
      dispatch(updateTermsR('Accepted'));
      dispatch(updateCountryR(selectedCountry));
      dispatch(updateImageR(imageR));

      navigate('/');
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        const errors: Record<string, string> = {};
        error.inner.forEach((validationError: yup.ValidationError) => {
          if (validationError.path) {
            errors[validationError.path] = validationError.message;
          }
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="form-title rHookForm-title">React Hook Form</h1>
      <div className="form rHookForm-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field form-name rHookForm-name">
            <label htmlFor="nameR">Name:</label>
            <input type="text" id="nameR" {...register('nameR')} />
            <p className="error">{errors.nameR?.message}</p>
          </div>
          <div className="form-field form-age rHookForm-age">
            <label htmlFor="ageR">Age:</label>
            <input type="number" id="ageR" {...register('ageR')} />
            <p className="error">{errors.ageR?.message}</p>
          </div>
          <div className="form-field form-email rHookForm-email">
            <label htmlFor="emailR">Email:</label>
            <input type="email" id="emailR" {...register('emailR')} />
            <p className="error">{errors.emailR?.message}</p>
          </div>
          <div className="form-field form-psw rHookForm-psw">
            <label htmlFor="pswR">Password:</label>
            <input type="password" id="pswR" {...register('pswR')} />
            <p className="error">{errors.pswR?.message}</p>
          </div>
          <div className="form-field form-pswRep rHookForm-pswRep">
            <label htmlFor="pswRepR">Password repeat:</label>
            <input type="password" id="pswRepR" {...register('pswRepR')} />
            <p className="error">{errors.pswRepR?.message}</p>
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
            <p className="error">{errors.genderR?.message}</p>
          </div>
          <div className="form-field form-terms rHookForm-terms">
            <label htmlFor="termsR">Terms and Conditions</label>
            <input type="checkbox" id="termsR" {...register('termsR')} />
            <p className="error">{errors.termsR?.message}</p>
          </div>
          <div className="form-field form-img rHookForm-img">
            <label htmlFor="imageR">Picture:</label>
            <input
              type="file"
              id="imageR"
              accept="image/png, image/jpeg"
              {...register('imageR')}
              onChange={(e) => {
                handleImage(e);
              }}
            />
            <p className="error">{errors.imageR?.message}</p>
          </div>
          <div className="form-field form-country rHookForm-country">
            <label htmlFor="country">Country:</label>
            <Autocomplete
              ref={inputCountryRef}
              onSelectCountry={handleSelectCountry}
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
