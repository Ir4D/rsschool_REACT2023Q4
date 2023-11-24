import { FC, ReactNode } from "react";
import Heading from "./Heading";

type layoutProps = {
  children: ReactNode;
};

const Layout:FC<layoutProps> = ({ children }) => (
  <>
    <Heading />
    {children}
  </>
);

export default Layout;