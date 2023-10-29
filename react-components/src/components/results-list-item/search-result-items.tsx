// import ApiService from "../../services/api-service";

// import { Key, ReactNode } from 'react';
// import React, { Component } from 'react';
// import ApiService from '../../services/api-service';

// import planet from '../../assets/img/planet.png';

// class SearchResultItem extends Component {
//   state = {
//     planetsList: []
//   }

//   apiService = new ApiService();

//   getItemsInfo = () => {
//     this.apiService.getAllPlanets()
//       .then((planetsList) => this.setState({ planetsList }));
//   }

//   renderPlanets(array): ReactNode {
//     const items = array.map((item: {
//       name: string;
//       terrain: string;
//       climate: string;
//       diameter: string;
//       population: string;
//     }) => (
//       <li className='planet__item' key={item.name}>
//         <img src={planet} alt="Planet" className='planet__img' />
//         <div>
//           <p className='planet__info planet__name'>{item.name}</p>
//           <p className='planet__info planet__terrain'>{item.terrain}</p>
//           <p className='planet__info planet__climate'>{item.climate}</p>
//           <p className='planet__info planet__diameter'>{item.diameter}</p>
//           <p className='planet__info planet__population'>{item.population}</p>
//         </div>
//       </li>
//     ));
//     return (
//       <ul>
//         {items}
//       </ul>
//     );
//   }
    
//   render() {
//     const { planetsList } = this.state;
//     const items = this.renderPlanets(planetsList);
//     return (
//       <div>
//         {items}
//       </div>
//     );
//   }
    
// }

// export default SearchResultItem;