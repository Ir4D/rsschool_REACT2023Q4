/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import ApiService from '../../services/api-service';
import './results-list.css';

import Spinner from '../spinner/spinner';
import PaginationPanel from '../pagination-panel/pagination-panel';

type Anime = {
  title: string;
  year: number;
  type: string;
  img: string;
};

const ResultsList = (props: {
  term: string;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}) => {
  const [resultsList, setResultList] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiService = new ApiService();

  const loadPageData = async (
    term: string,
    page: number,
    itemsPerPage: number
  ) => {
    try {
      let newResultsList;

      if (term.length === 0) {
        newResultsList = await apiService.getAllItems(page, itemsPerPage);
      } else {
        newResultsList = await apiService.getSearchItems(
          term,
          page,
          itemsPerPage
        );
      }

      setResultList(newResultsList);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadPageData(props.term, props.page, props.itemsPerPage);
  }, [props.term, props.page, props.itemsPerPage]);

  function renderAnime(arr: Anime[]) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return <p>No anime were found</p>;
    }

    const animeList = arr.map((anime) => {
      return (
        <li className="anime-item" key={anime.title}>
          <img src={anime.img} alt="Anime" className="anime-img" />
          <div className="anime-description">
            <p className="anime-info anime-title">{anime.title}</p>
            <p className="anime-info anime-year">Year: {anime.year}</p>
            <p className="anime-info anime-type">Type: {anime.type}</p>
          </div>
        </li>
      );
    });

    return <ul className="anime-list">{animeList}</ul>;
  }

  if (loading) {
    return <Spinner />;
  }

  const animeList = renderAnime(resultsList);
  return (
    <>
      <PaginationPanel
        page={props.page}
        updatePage={props.setPage}
        itemsPerPage={props.itemsPerPage}
        setItemsPerPage={props.setItemsPerPage}
      />
      <div className="results-panel">{animeList}</div>
    </>
  );
};

export default ResultsList;
