import ApiService from "../../services/api-service";

const SearchResultItem = () => {

  const apiService = new ApiService();

  apiService.getSearchItems('ta').then(data => console.log(data));

  return (
    <div>
      <p>Search Result Item</p>
    </div>
  )
}

export default SearchResultItem;