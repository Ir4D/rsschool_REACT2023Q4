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
}

export default ApiService;