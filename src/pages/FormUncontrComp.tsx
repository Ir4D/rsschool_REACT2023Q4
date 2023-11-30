import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateAge, updateCountry, updateEmail, updateGender, updateName, updatePsw } from "../reducer";

const FormUncontrComp = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPswRef = useRef<HTMLInputElement>(null);
  const inputPswRepRef = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputTerms = useRef<HTMLInputElement>(null);
  const inputCountry = useRef<HTMLSelectElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(`Name: ${inputNameRef.current?.value}`);
    console.log(`Age: ${inputAgeRef.current?.value}`);
    console.log(`Email: ${inputEmailRef.current?.value}`);
    console.log(`Password: ${inputPswRef.current?.value}`);
    console.log(`Password repeat: ${inputPswRepRef.current?.value}`);
    console.log(`Gender: ${inputGender.current?.value}`);
    console.log(`Terms: ${inputTerms.current?.value}`);
    console.log(`Country: ${inputCountry.current?.value}`);

    dispatch(updateName(inputNameRef.current?.value));
    dispatch(updateAge(inputAgeRef.current?.value));
    dispatch(updateEmail(inputEmailRef.current?.value));
    dispatch(updatePsw(inputPswRef.current?.value));
    dispatch(updateGender(inputGender.current?.value));
    dispatch(updateCountry(inputCountry.current?.value));
  }

  return (
    <>
      <h1 className="form-title uncontrForm-title">Uncontrolled components Form</h1>
      <div className="form uncontrForm-form">
        <form onSubmit={handleSubmit}>
          <div className="form-name uncontrForm-name">
            <label>Name:</label>
            <input 
              type="text"
              name="name"
              ref={inputNameRef}
            />
          </div>
          <div className="form-age uncontrForm-age">
            <label>Age:</label>
            <input 
              type="number"
              name="age"
              ref={inputAgeRef}
            />
          </div>
          <div className="form-email uncontrForm-email">
            <label>Email:</label>
            <input 
              type="email"
              name="email"
              ref={inputEmailRef}
            />
          </div>
          <div className="form-psw uncontrForm-psw">
            <label>Password:</label>
            <input 
              type="password"
              name="psw"
              ref={inputPswRef}
            />
          </div>
          <div className="form-pswRep uncontrForm-pswRep">
            <label>Password repeat:</label>
            <input 
              type="password"
              name="pswRep"
              ref={inputPswRepRef}
            />
          </div>
          <div className="form-gender uncontrForm-gender">
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
          <div className="form-terms uncontrForm-terms">
            <input 
              type="checkbox"
              name="terms"
              ref={inputTerms}
              />
            <label>Terms and Conditions</label>
          </div>
          <div className="form-img uncontrForm-img">
          <label>Picture:</label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="form-country uncontrForm-country">
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              ref={inputCountry}
            >
              <option value="italy">Italy</option>
              <option value="spain">Spain</option>
              <option value="portugal">Portugal</option>
            </select>
          </div>
          <button 
            className="form-btn uncontrForm-btn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default FormUncontrComp;
