import { FC, ReactNode } from "react";
import Heading from "./Heading";
import SearchPanel from "./SearchPanel";

type layoutProps = {
  children: ReactNode;
};

const Layout:FC<layoutProps> = ({ children }) => (
  <>
    <Heading />
    <SearchPanel />
    {children}
  </>
);

export default Layout;