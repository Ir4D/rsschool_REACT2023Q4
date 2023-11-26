import { FC } from "react";
import { GetServerSideProps } from "next";
import DetailsInfo from "@/components/DetailsInfo";
import { cardsType } from "@/types";

type cardDetailsTypesProps = {
  cardDetails: cardsType,
}

export const getServerSideProps: GetServerSideProps<cardDetailsTypesProps> = async (context) => {
  const id = context.params?.id;

  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await response.json();

  if (!data || data.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cardDetails: data.data,
    },
  };
};

const Details:FC<cardDetailsTypesProps> = ({ cardDetails }) => {
  return (
    <>
      <DetailsInfo cardDetails={cardDetails} />
    </>
  );
};

export default Details;
