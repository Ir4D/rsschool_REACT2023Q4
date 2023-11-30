import { useRef } from "react";

const FormUncontrComp = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPswRef = useRef<HTMLInputElement>(null);
  const inputPswRepRef = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputTerms = useRef<HTMLInputElement>(null);
  const inputCountry = useRef<HTMLSelectElement>(null);

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    console.log(`Name: ${inputNameRef.current?.value}`);
    console.log(`Age: ${inputAgeRef.current?.value}`);
    console.log(`Email: ${inputEmailRef.current?.value}`);
    console.log(`Password: ${inputPswRef.current?.value}`);
    console.log(`Password repeat: ${inputPswRepRef.current?.value}`);
    console.log(`Gender: ${inputGender.current?.value}`);
    console.log(`Terms: ${inputTerms.current?.value}`);
    console.log(`Country: ${inputCountry.current?.value}`);
  }

  return (
    <>
      <h1>Uncontrolled components Form</h1>
      <div className="uncontrForm">
        <form onSubmit={handleSubmit}>
          <div className="uncontrName">
            <label>Name:</label>
            <input 
              type="text"
              name="name"
              ref={inputNameRef}
            />
          </div>
          <div className="uncontrAge">
            <label>Age:</label>
            <input 
              type="number"
              name="age"
              ref={inputAgeRef}
            />
          </div>
          <div className="uncontrEmail">
            <label>Email:</label>
            <input 
              type="email"
              name="email"
              ref={inputEmailRef}
            />
          </div>
          <div className="uncontrPsw">
            <label>Password:</label>
            <input 
              type="password"
              name="psw"
              ref={inputPswRef}
            />
          </div>
          <div className="uncontrPswRep">
            <label>Password repeat:</label>
            <input 
              type="password"
              name="pswRep"
              ref={inputPswRepRef}
            />
          </div>
          <div className="uncontrGender">
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
          <div className="uncontrTerms">
            <input 
              type="checkbox"
              name="terms"
              ref={inputTerms}
              />
            <label>Terms and Conditions</label>
          </div>
          <div className="uncontrImg">
          <label>Picture:</label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="uncontrCountry">
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
            className="uncontrBtn"
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
