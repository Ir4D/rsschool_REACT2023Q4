import Layout from "@/components/Layout";
import { cardsType } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type cardsTypesProps = {
  cards: cardsType[],
}

const Home = ({cards}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

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
