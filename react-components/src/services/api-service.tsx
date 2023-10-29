class ApiService {
  _apiUrl = 'https://swapi.dev/api/planets/';
  
  getData = async (url: string) => {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`The ${url} cannot be fetched. ${data.status}`);
    }

    return await data.json();
  }

  getAllItems = () => {
    return this.getData(`${this._apiUrl}`);
  }

  getSearchItems = (searchText: string) => {
    return this.getData(`${this._apiUrl}?search=${searchText}`);
  }

  // getAllPlanets = async () => {
  //   const data = await this.getData(this._apiUrl);
  //   return data.results.map((elem: {
  //     name: string;
  //     terrain: string;
  //     climate: string;
  //     diameter: string;
  //     population: string;
  //   }) => ({
  //     name: elem.name,
  //     terrain: elem.terrain,
  //     climate: elem.climate,
  //     diameter: elem.diameter,
  //     population: elem.population,
  //   }));
  // };

  getAllPlanets = async () => {
    const data = await this.getData(this._apiUrl);
    return data.results.map((elem: { 
      name: string; 
      terrain: string; 
      climate: string; 
      diameter: string; 
      population: string; 
    }) => {
      return {
          name: elem.name,
          terrain: elem.terrain,
          climate: elem.climate,
          diameter: elem.diameter,
          population: elem.population,
      }
    });
  };
}

export default ApiService;