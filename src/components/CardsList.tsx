import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import CardItem from "./CardItem";

import style from "../styles/CardsList.module.css";
import Pagination from "./PaginationPanel";

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  type: string;
  images?: { jpg: { image_url: string } };
  image_url: string;
}

const CardsList = (props: { 
  term: string;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}) => {
  const [cardsList, setCardsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPageData = async (
    term: string,
    page: number,
    itemsPerPage: number
  ) => {
    try {
      const fetchData = async  () => {
        const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${itemsPerPage}&page=${page}`);
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
    loadPageData(props.term, props.page, props.itemsPerPage);
  }, [props.term, props.page, props.itemsPerPage]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Pagination
        page={props.page}
        updatePage={props.setPage}
        itemsPerPage={props.itemsPerPage}
        setItemsPerPage={props.setItemsPerPage}
      />
      <div>  
        {cardsList && cardsList.length !== 0 ? (
          <ul className={style.animeList}>
            {cardsList && cardsList.map((anime: AnimeItem) => (
              <CardItem key={anime.mal_id} anime={anime} />
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
