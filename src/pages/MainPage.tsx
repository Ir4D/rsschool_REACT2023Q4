import { useSelector } from 'react-redux';

import './pages.css';

const MainPage = () => {
  const mainPageHeading = 'The Main Page';

  const { name, age, email, psw, gender, country, image } = useSelector(
    (state: {
      toolkit: {
        name: string;
        age: string;
        email: string;
        psw: string;
        gender: string;
        country: string;
        image: string;
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
        </div>
      </div>
    </div>
  );
};

export default MainPage;
