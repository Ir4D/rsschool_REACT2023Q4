import { FC, ReactNode, useState } from "react";
import Heading from "./Heading";

type layoutProps = {
  children: ReactNode;
};

const Layout:FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Heading />
      {children}
    </>
  );
};

export default Layout;
