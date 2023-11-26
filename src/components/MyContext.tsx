import { createContext, ReactNode, useContext, useState } from 'react';

type MyContextProps = {
  children: ReactNode;
};

type MyContextType = {
  term: string;
  setTerm: (value: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  updateData: (value: string) => void;
  updatePage: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  const [term, setTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const updateData = (value: string) => {
    setTerm(value);
  };

  const updatePage = (value: number) => {
    setCurrentPage(value);
  };

  const contextValue = {
    term,
    setTerm,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    updateData,
    updatePage,
    loading,
    setLoading,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('Some error');
  }
  return context;
};
