import { useState, useEffect, useRef } from 'react';
import ApiService from '../../services/api-service';
import './results-list.css';

import planetImg from '../../assets/img/planet.png';
import Spinner from '../spinner/spinner';

type Planet = {
  name: string;
  terrain: string;
  climate: string;
  diameter: string;
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
        resultsList = await apiService.getAllPlanets();
      } else {
        resultsList = await apiService.getSearchPlanets(term);
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

  function renderPlanets(arr: Planet[]) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return <p>No planets were found</p>;
    }

    const planets = arr.map((planet) => {
      return (
        <li className="planet-item" key={planet.name}>
          <img src={planetImg} alt="Planet" className="planet-img" />
          <div className="planet-description">
            <p className="planet-info planet-name">{planet.name}</p>
            <p className="planet-info planet-terrain">
              Terrain: {planet.terrain}
            </p>
            <p className="planet-info planet-climate">
              Climate: {planet.climate}
            </p>
            <p className="planet-info planet-diameter">
              Diameter: {planet.diameter}
            </p>
          </div>
        </li>
      );
    });

    return <ul className="planets-list">{planets}</ul>;
  }

  if (loading) {
    return <Spinner />;
  }

  const planets = renderPlanets(resultsList);
  return <div className="results-panel">{planets}</div>;
};

export default ResultsList;
