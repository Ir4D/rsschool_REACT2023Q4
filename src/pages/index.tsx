import Layout from "@/components/Layout";
import { useMyContext } from "@/components/MyContext";
import { cardsType } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { createContext, useState } from "react";

type cardsTypesProps = {
  cards: cardsType[],
}

// export type ContextProps = {
//   term: string;
//   setTerm: (value: string) => void;
//   updateData: (value: string) => void;
//   updatePage: (value: number) => void;
//   itemsPerPage: number;
//   currentPage: number;
//   resultsList: never[];
//   setResultList: (value: []) => void;
//   setItemsPerPage: (value: number) => void;
//   setCurrentPage: (value: number) => void;
//   children?: React.ReactNode;
// };

// export const Context = createContext<ContextProps>({
//   term: '',
//   setTerm: () => {},
//   updateData: () => {},
//   updatePage: () => {},
//   itemsPerPage: 12,
//   currentPage: 1,
//   resultsList: [],
//   setResultList: () => {},
//   setItemsPerPage: () => {},
//   setCurrentPage: () => {},
// });

const Home = ({cards}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const { term, setTerm, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, updateData, updatePage } = useMyContext();

  return (
    <Layout cards={cards}/>
  );
};

export const getServerSideProps: GetServerSideProps<cardsTypesProps> = async (context) => {
  const term = context.query.search as string || '';
  const itemsPerPage = context.query.itemsPerPage as string || '12';
  const page = context.query.page as string || '1'; 

  const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${itemsPerPage}&page=${page}`);
  const data = await responce.json();

  return {
    props: {
      cards: data.data,
    }
  }
}

export default Home;
