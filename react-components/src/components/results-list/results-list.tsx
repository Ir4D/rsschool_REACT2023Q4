import { Component } from "react";
import ApiService from "../../services/api-service";
import './results-list.css';

import planetImg from '../../assets/img/planet.png';
import Spinner from "../spinner/spinner";

type Planet = {
  name: string;
  terrain: string;
  climate: string;
  diameter: string;
};

type ResultsListProps = {
  term: string;
};

class ResultsList extends Component<ResultsListProps> {
  state = {
    resultsList: [],
    loading: true
  };

  apiService = new ApiService();

  componentDidMount() {
    this.loadData(this.props.term);
  }

  async componentDidUpdate(prevProps: ResultsListProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ loading: true });
      await this.loadData(this.props.term);
      this.setState({ loading: false });
    }
  }

  async loadData(term: string) {
    try {
      let resultsList;

      if (term.length === 0) {
        resultsList = await this.apiService.getAllPlanets();
      } else {
        resultsList = await this.apiService.getSearchPlanets(term);
      }

      this.setState({
        resultsList, loading: false
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  renderPlanets(arr: Planet[]) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return <p>No planets were found</p>;
    }

    const planets = arr.map(planet => {
      return (
        <li className='planet-item' key={planet.name}>
          <img src={planetImg} alt="Planet" className='planet-img' />
          <div className="planet-description">
            <p className='planet-info planet-name'>{planet.name}</p>
            <p className='planet-info planet-terrain'>Terrain: {planet.terrain}</p>
            <p className='planet-info planet-climate'>Climate: {planet.climate}</p>
            <p className='planet-info planet-diameter'>Diameter: {planet.diameter}</p>
          </div>
        </li>
      );
    });

    return (
      <ul className="planets-list">
        {planets}
      </ul>
    );
  }

  render() {
    const { resultsList, loading } = this.state;

    if (loading) {
      return <Spinner/>
    }

    const planets = this.renderPlanets(resultsList);

    return (
      <div className="results-panel">
        {planets}
      </div>
    );
  }
}

export default ResultsList;