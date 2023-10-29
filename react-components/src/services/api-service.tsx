class ApiService {
  _apiUrl = 'https://swapi.dev/api/planets/';
  
  getData = async (url: string) => {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`The ${url} cannot be fetched. ${data.status}`);
    }

    return await data.json();
  }

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

  getSearchPlanets = async (searchText: string) => {
    const data = await this.getData(`${this._apiUrl}?search=${searchText}`);
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