import { Link } from "react-router-dom";

import './header.css';

const Header = () => {
  return (
    <>
      <nav className="nav">
        <Link to="">Main Page</Link>
        <Link to="uncontr-comp">Uncontrolled components Form</Link>
        <Link to="react-hook">React Hook Form</Link>
      </nav>
    </>
  )
}

export default Header;