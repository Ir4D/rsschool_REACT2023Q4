import { FC } from "react";
import { GetServerSideProps } from "next";
import DetailsInfo from "@/components/DetailsInfo";
import { cardsType } from "@/types";
import Layout from "@/components/Layout";

import style from "../../styles/CardsList.module.css";

type cardDetailsTypesProps = {
  cardDetails: cardsType,
  cards: cardsType[]
}

export const getServerSideProps: GetServerSideProps<cardDetailsTypesProps> = async (context) => {
  const id = context.params?.id;
  const { term, itemsPerPage, page } = context.query;
  console.log(itemsPerPage);

  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await response.json();

  const responseAll = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${itemsPerPage}&page=${page}`);
  const dataAll = await responseAll.json();

  if (!dataAll || !data || data.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cardDetails: data.data,
      cards: dataAll.data
    },
  };
};

const Details:FC<cardDetailsTypesProps> = ({ cardDetails, cards}) => {
  console.log(cardDetails);
  console.log(cards);
  return (
    <div className={style.detalsPage}>
      <Layout cards={cards} />
      <DetailsInfo cardDetails={cardDetails} />
    </div>
  );
};

export default Details;
