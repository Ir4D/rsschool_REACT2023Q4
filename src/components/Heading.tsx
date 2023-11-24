import { FC } from "react";
import style from "../styles/Heading.module.css";

const Heading:FC = () => {
  return (
    <div className={style.appWrapper}>
      <div
        className={style.appMain}
        // onClick={goToMainPage}
      >
        <h1 className={style.appHeading}>Anime List:</h1>
      </div>
    </div>
  );
};

export default Heading;
