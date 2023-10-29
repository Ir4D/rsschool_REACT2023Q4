import React, { Component } from "react";
import ApiService from "../../services/api-service";

import planetImg from '../../assets/img/planet.png';

type Planet = {
  name: string;
  terrain: string;
  climate: string;
  diameter: string;
  population: string;
};

type State = {
  resultsList: Planet[];
};

class ResultsList extends Component<object, State> {
  state: State = {
    resultsList: []
  }

  apiService = new ApiService();

  componentDidMount() {
    this.apiService.getAllPlanets()
        .then((resultsList) => {
          this.setState({
              resultsList
          })
        })
  }

  renderPlanets(arr: Planet[]) {
    const planets = arr.map((planet) => {
      return (
        <li className='planet-item' key={planet.name}>
          <img src={planetImg} alt="Planet" className='planet-img' />
          <div className="planet-description">
            <p className='planet-info planet-name'>Name: {planet.name}</p>
            <p className='planet-info planet-terrain'>Terrain: {planet.terrain}</p>
            <p className='planet-info planet-climate'>Climate: {planet.climate}</p>
            <p className='planet-info planet-diameter'>Diameter: {planet.diameter}</p>
            <p className='planet-info planet-population'>Population: {planet.population}</p>
          </div>
        </li>
      );
    });

    return (
      <ul>
        {planets}
      </ul>
    )
  }

  render() {
    const {resultsList} = this.state;

    const planets = this.renderPlanets(resultsList);

    return (
      <div className="planets-list">
        {planets}
      </div>
    )
  }

}

export default ResultsList;