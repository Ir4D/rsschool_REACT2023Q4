/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api-service';
import Spinner from '../spinner/spinner';
import PaginationPanel from '../pagination-panel/pagination-panel';
import { Context } from '../pages/main-page';

import './results-list.css';
import { useSelector } from 'react-redux';

type Anime = {
  id: number;
  title: string;
  year: number;
  img: string;
};

type ResultsListProps = {
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
};

const ResultsList: React.FC<ResultsListProps> = ({
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  // const { term } = useContext(Context);
  // const term = useSelector(state => state.term);
  const term = useSelector(
    (state: unknown) => (state as { term: string }).term
  );

  const { resultsList, setResultList } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [, setSelectedAnime] = useState<Anime | null>(null);

  const { getAllItems, getSearchItems } = ApiService();

  const loadPageData = async (
    term: string,
    page: number,
    itemsPerPage: number
  ) => {
    try {
      let newResultsList;

      if (term.length === 0) {
        newResultsList = await getAllItems(page, itemsPerPage);
      } else {
        newResultsList = await getSearchItems(term, page, itemsPerPage);
      }

      setResultList(newResultsList);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadPageData(term, page, itemsPerPage);
  }, [term, page, itemsPerPage]);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  function renderAnime(arr: Anime[]) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return <p>No anime were found</p>;
    }

    const animeList = arr.map((anime) => (
      <Link
        to={`/rsschool_REACT2023Q4/details/${anime.id}`}
        key={anime.id}
        onClick={() => handleAnimeClick(anime)}
      >
        <li className="anime-item" onClick={() => handleAnimeClick(anime)}>
          <img src={anime.img} alt="Anime" className="anime-img" />
          <div className="anime-description">
            <h3 className="anime-info anime-title">{anime.title}</h3>
            <p className="anime-info anime-year">Year: {anime.year}</p>
          </div>
        </li>
      </Link>
    ));

    return <ul className="anime-list">{animeList}</ul>;
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <>
          <PaginationPanel
            page={page}
            updatePage={setPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <div className="results-panel">{renderAnime(resultsList)}</div>
        </>
      )}
    </>
  );
};

export default ResultsList;
