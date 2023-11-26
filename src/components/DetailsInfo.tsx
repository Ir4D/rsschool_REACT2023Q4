/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC, useContext } from "react";
import style from "../styles/CardsList.module.css";
import { cardsType } from "@/types";
// import { Context } from "@/pages";
import { useMyContext } from "./MyContext";


type detailsInfoProps = {
  cardDetails: cardsType,
};

const DetailsInfo:FC<detailsInfoProps> = ({ cardDetails }) => {  
  const { term, setTerm, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, updateData, updatePage } = useMyContext();
  console.log(term);

  if (!cardDetails) {
    return <h3>No details found</h3>
  }
  
  const { title, title_japanese, year, type, images, score, rating } = cardDetails || {};

  const imageUrl = images?.jpg?.image_url;

  return (
    <>
      <div className={style.itemDetails}>
        <div>
          {imageUrl && (
            <img src={imageUrl} alt="Anime" className={style.animeImg} />
          )}
          <div className={style.animeDescription}>
            <p className={`${style.animeInfo} ${style.animeTitle}`}>{title}</p>
            <p className={`${style.animeInfo} ${style.animeTitle}`}>{title_japanese}</p>
            <p className={`${style.animeInfo} ${style.animeYear}`}>Year: {year}</p>
            <p className={`${style.animeInfo} ${style.animeType}`}>Type: {type}</p>
            <p className={`${style.animeInfo} ${style.animeScore}`}>Score: {score}</p>
            <p className={`${style.animeInfo} ${style.animeRating}`}>Rating: {rating}</p>
          </div>
          <Link href={`/?search=${term}&itemsPerPage=${itemsPerPage}&page=${currentPage}`}>
          {/* <Link href={`/`}> */}
            <button className={style.itemDetailsBtn}>Close</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default DetailsInfo;
