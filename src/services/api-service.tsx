const ApiService = () => {
  const _apiUrl = 'https://api.jikan.moe/v4/anime';

  const getData = async (url: string) => {
    const data = await fetch(url);
    if (!data.ok) {
      throw new Error(`The ${url} cannot be fetched. ${data.status}`);
    }
    return await data.json();
  };

  const getAllItems = async (page: number, itemsPerPage: number) => {
    const data = await getData(`${_apiUrl}?limit=${itemsPerPage}&page=${page}`);
    return data.data.map(
      (elem: {
        mal_id: number;
        title: string;
        year: number;
        type: string;
        images?: { jpg: { image_url: string } };
        image_url: string;
      }) => {
        return {
          id: elem.mal_id,
          title: elem.title,
          year: elem.year ? elem.year : 'Unknown',
          type: elem.type ? elem.type : 'Unknown',
          img: elem.images ? elem.images.jpg.image_url : '',
        };
      }
    );
  };

  const getSearchItems = async (
    searchText: string,
    page: number,
    itemsPerPage: number
  ) => {
    const data = await getData(
      `${_apiUrl}?q=${searchText}&limit=${itemsPerPage}&page=${page}`
    );
    return data.data.map(
      (elem: {
        mal_id: number;
        title: string;
        year: number;
        type: string;
        images?: { jpg: { image_url: string } };
        image_url: string;
      }) => {
        return {
          id: elem.mal_id,
          title: elem.title,
          year: elem.year ? elem.year : 'Unknown',
          type: elem.type ? elem.type : 'Unknown',
          img: elem.images ? elem.images.jpg.image_url : '',
        };
      }
    );
  };

  const getItemDetails = async (id: number) => {
    const data = await getData(`${_apiUrl}/${id}`);
    return {
      id: data.data.mal_id,
      title: data.data.title,
      year: data.data.year ? data.data.year : 'Unknown',
      type: data.data.type ? data.data.type : 'Unknown',
      img: data.data.images ? data.data.images.jpg.image_url : '',
    };
  };

  return {
    getData,
    getAllItems,
    getSearchItems,
    getItemDetails,
  };
};

export default ApiService;
