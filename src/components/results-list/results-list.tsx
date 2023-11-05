/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import ApiService from '../../services/api-service';
import './results-list.css';

import Spinner from '../spinner/spinner';

type Anime = {
  title: string;
  year: number;
  type: string;
  img: string;
};

const ResultsList = (props: { term: string }) => {
  const [resultsList, setResultList] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevPropsRef = useRef({ term: props.term });

  const apiService = new ApiService();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchInput');
    if (savedSearchTerm) {
      loadData(savedSearchTerm);
    } else {
      loadData(props.term);
    }
  }, []);

  async function loadData(term: string) {
    try {
      let resultsList;

      if (term.length === 0) {
        resultsList = await apiService.getAllItems();
        console.log(resultsList);
      } else {
        resultsList = await apiService.getSearchItems(term);
      }

      setResultList(resultsList);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  useEffect(() => {
    if (prevPropsRef.current.term !== props.term) {
      setLoading(true);
      loadData(props.term).then(() => {
        setLoading(false);
      });
      prevPropsRef.current.term = props.term;
    }
  }, [props.term]);

  function renderPlanets(arr: Anime[]) {
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

  const animeList = renderPlanets(resultsList);
  return <div className="results-panel">{animeList}</div>;
};

export default ResultsList;
