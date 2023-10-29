// import ApiService from "../../services/api-service";

// import ApiService from '../../services/api-service';

// import planet from '../../assets/img/planet.png';

// const ResultsListItem = ({name, terrain, climate, diameter, population}) => {

//   return (
//     <li className='planet__item' key={name}>
//       <img src={planet} alt="Planet" className='planet__img' />
//       <div>
//         <p className='planet__info planet__name'>{name}</p>
//         <p className='planet__info planet__terrain'>{terrain}</p>
//         <p className='planet__info planet__climate'>{climate}</p>
//         <p className='planet__info planet__diameter'>{diameter}</p>
//         <p className='planet__info planet__population'>{population}</p>
//       </div>
//     </li>
//   );
// }

// export default ResultsListItem;

import { Component } from "react";
import ApiService from "../../services/api-service";

import planetImg from '../../assets/img/planet.png';

class ResultsList extends Component {
  state = {
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

  renderPlanets(arr) {
    const planets = arr.map((planet) => {
      return (
        <li className='planet__item' key={planet.name}>
          <img src={planetImg} alt="Planet" className='planet__img' />
          <div>
            <p className='planet__info planet__name'>Name: {planet.name}</p>
            <p className='planet__info planet__terrain'>Terrain: {planet.terrain}</p>
            <p className='planet__info planet__climate'>Climate: {planet.climate}</p>
            <p className='planet__info planet__diameter'>Diameter: {planet.diameter}</p>
            <p className='planet__info planet__population'>Population: {planet.population}</p>
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
      <div>
        {planets}
      </div>
    )
  }

}

export default ResultsList;