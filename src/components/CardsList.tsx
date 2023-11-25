import { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import CardItem from "./CardItem";

import style from "../styles/CardsList.module.css";

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  type: string;
  images?: { jpg: { image_url: string } };
  image_url: string;
}

const CardsList = (props: { term: string; }
) => {
  const [cardsList, setCardsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const limit = 12;
  const page = 1;

  const loadPageData = async (
    term: string,
  ) => {
    try {
      const fetchData = async  () => {
        const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${limit}&page=${page}`);
        const data = await responce.json();
        setCardsList(data.data);
      }
      fetchData();
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    // const fetchData = async  () => {
    //   const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${searchText}&limit=${limit}&page=${page}`);
    //   const data = await responce.json();
    //   setCardsList(data.data);
    // }
    // fetchData();
    loadPageData(props.term);
  }, [props.term]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Cards</h2>
      <div>  
        {cardsList && cardsList.length !== 0 ? (
          <ul className={style.animeList}>
            {cardsList && cardsList.map((anime: AnimeItem) => (
              <CardItem key={anime.mal_id} anime={anime} />
              // <li key={anime.mal_id}>
              //   <Link href={`/details/${anime.mal_id}`}>{anime.title}</Link>
              // </li>
            ))}
        </ul>
        ) : (
        <p>No anime were found</p>
        )}
      </div>
    </>
  );
};

export default CardsList;
