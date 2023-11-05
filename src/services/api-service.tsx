class ApiService {
  _apiUrl = 'https://api.jikan.moe/v4/anime';
  limit = 12;

  getData = async (url: string) => {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`The ${url} cannot be fetched. ${data.status}`);
    }

    return await data.json();
  };

  getAllItems = async (page: number, itemsPerPage: number) => {
    const data = await this.getData(
      `${this._apiUrl}?limit=${itemsPerPage}&page=${page}`
    );
    return data.data.map(
      (elem: {
        title: string;
        year: number;
        type: string;
        images?: { jpg: { image_url: string } };
        image_url: string;
      }) => {
        return {
          title: elem.title,
          year: elem.year ? elem.year : 'Unknown',
          type: elem.type ? elem.type : 'Unknown',
          img: elem.images ? elem.images.jpg.image_url : '',
        };
      }
    );
  };

  getSearchItems = async (
    searchText: string,
    page: number,
    itemsPerPage: number
  ) => {
    const data = await this.getData(
      `${this._apiUrl}?q=${searchText}&limit=${itemsPerPage}&page=${page}`
    );
    return data.data.map(
      (elem: {
        title: string;
        year: number;
        type: string;
        images?: { jpg: { image_url: string } };
        image_url: string;
      }) => {
        return {
          title: elem.title,
          year: elem.year ? elem.year : 'Unknown',
          type: elem.type ? elem.type : 'Unknown',
          img: elem.images ? elem.images.jpg.image_url : '',
        };
      }
    );
  };
}

export default ApiService;
