import { FC, ReactNode, useState } from "react";
import Heading from "./Heading";
import SearchPanel from "./SearchPanel";

type layoutProps = {
  children: ReactNode;
};

const Layout:FC<layoutProps> = ({ children }) => {
  // const [term, setTerm] = useState('');
  // const updateData = (value: string) => {
  //   setTerm(value);
  // };

  return (
    <>
      <Heading />
      {/* <SearchPanel updateData={updateData} /> */}
      {children}
    </>
  );
};

export default Layout;
