import { useState, createContext } from 'react';

export type ContextProps = {
  // term: string;
  // setTerm: (value: string) => void;
  // updateData: (value: string) => void;
  resultsList: never[];
  setResultList: (value: []) => void;
  children?: React.ReactNode;
};

export const Context = createContext<ContextProps>({
  // term: '',
  // setTerm: () => {},
  // updateData: () => {},
  resultsList: [],
  setResultList: () => {},
});

const CardsProvider = ({ children }) => {
  const [resultsList, setResultList] = useState([]);

  return (
    <Context.Provider
      value={{
        // term,
        // setTerm,
        // updateData,
        resultsList,
        setResultList,
      }}
    >
      { children }
    </Context.Provider>
  );
};
