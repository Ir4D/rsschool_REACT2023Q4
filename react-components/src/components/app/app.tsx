// import SearchPanel from '../search-panel/search-panel'
// import ResultsList from '../results-list/results-list'
import ApiService from '../../services/api-service'
import './app.css'

// const apiService = new ApiService();

// apiService.getAllItems().then(data => data.results.forEach((elem: { name: string; }) => console.log(elem.name)));

function App() {
  const apiService = new ApiService();
  // const data = apiService.getAllPlanets();

  // console.log(data);

  apiService.getAllPlanets().then(data => console.log(data));

  return (
    <div>
      <h1>React Components</h1>
      {/* <SearchPanel/> */}

      {/* <ResultsList data={data}/> */}
      {/* <ResultsList/> */}
    </div>
  )
}

export default App
