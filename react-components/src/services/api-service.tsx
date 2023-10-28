

class ApiService {
  getData = async (url: string) => {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`The ${url} cannot be fetched. ${data.status}`);
    }

    return await data.json();
  }

  getAllItems = () => {
    return this.getData('https://swapi.dev/api/planets/');
  }

  getSearchItems = (searchText: string) => {
    return this.getData(`https://swapi.dev/api/planets/?search=${searchText}`);
  }
}

export default ApiService;