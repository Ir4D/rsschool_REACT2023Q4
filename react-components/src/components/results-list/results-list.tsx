import { Component } from "react";
import ApiService from "../../services/api-service";
import './results-list.css';

import planetImg from '../../assets/img/planet.png';

type Planet = {
  name: string;
  terrain: string;
  climate: string;
  diameter: string;
};

// class ResultsList extends Component {
//   state = {
//     resultsList: [],
//     term: ''
//   }

//   apiService = new ApiService();

//   componentDidMount() {
//     this.loadData();
//   }

//   componentDidUpdate(prevProps: { term: string; }, prevState: { term: string; }) {
//     if (prevState.term !== this.state.term) {
//       this.loadData();
//     }
//   }

//   loadData() {
//     if (this.state.term.length === 0) {
//       this.apiService.getAllPlanets()
//         .then((resultsList) => {
//           this.setState({
//             resultsList
//           })
//         });
//     } else {
//       this.apiService.getSearchPlanets(this.state.term)
//         .then((resultsList) => {
//           this.setState({
//             resultsList
//           });
//         });
//     }
//   }

//   renderPlanets(arr: Planet[]) {
//     const planets = arr.map((planet) => {
//       return (
//         <li className='planet-item' key={planet.name}>
//           <img src={planetImg} alt="Planet" className='planet-img' />
//           <div className="planet-description">
//             <p className='planet-info planet-name'>{planet.name}</p>
//             <p className='planet-info planet-terrain'>Terrain: {planet.terrain}</p>
//             <p className='planet-info planet-climate'>Climate: {planet.climate}</p>
//             <p className='planet-info planet-diameter'>Diameter: {planet.diameter}</p>
//           </div>
//         </li>
//       );
//     });

//     return (
//       <ul className="planets-list">
//         {planets}
//       </ul>
//     )
//   }

//   render() {
//     // console.log(this.state.resultsList);
//     console.log(this.state.term);
//     const {resultsList} = this.state;
//     const planets = this.renderPlanets(resultsList);
    
//     console.log(this.state.resultsList);


//     return (
//       <div className="results-panel">
//         {planets}
//       </div>
//     )
//   }
// }

type ResultsListProps = {
  term: string;
};

class ResultsList extends Component<ResultsListProps> {
  state = {
    resultsList: []
  };

  apiService = new ApiService();

  componentDidMount() {
    this.loadData(this.props.term);
  }

  // componentDidUpdate(prevProps: { term: string; }) {
  //   if (prevProps.term !== this.props.term) {
  //     this.loadData(this.props.term);
  //   }
  // }

  async componentDidUpdate(prevProps: ResultsListProps) {
    if (prevProps.term !== this.props.term) {
      console.log("term has changed to:", this.props.term);
      await this.loadData(this.props.term);
    }
  }

  // loadData(term: string) {
  //   if (term.length === 0) {
  //     this.apiService
  //       .getAllPlanets()
  //       .then((resultsList) => {
  //         this.setState({
  //           resultsList
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error loading data:", error);
  //       });
  //   } else {
  //     this.apiService
  //       .getSearchPlanets(term)
  //       .then((resultsList) => {
  //         this.setState({
  //           resultsList
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error loading data:", error);
  //       });
  //   }
  // }

  async loadData(term: string) {
    try {
      let resultsList;

      if (term.length === 0) {
        resultsList = await this.apiService.getAllPlanets();
      } else {
        resultsList = await this.apiService.getSearchPlanets(term);
      }

      console.log("Data loaded:", resultsList);

      this.setState({
        resultsList
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  renderPlanets(arr: Planet[]) {
    if (!Array.isArray(arr)) {
      return null;
    }

    console.log("Planets array:", arr);

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
    const { resultsList } = this.state;
    // console.log(resultsList);
    const planets = this.renderPlanets(resultsList);

    return (
      <div className="results-panel">
        {planets}
      </div>
    );
  }
}

export default ResultsList;