import SearchPanel from '../search-panel/search-panel'
// import ResultsList from '../results-list/results-list'
import ApiService from '../../services/api-service'
import ResultsList from '../results-list-item/results-list-item';
import './app.css'

function App() {
  const apiService = new ApiService();

  apiService.getAllPlanets().then(data => console.log(data));

  return (
    <div>
      <h1>React Components</h1>
      <SearchPanel/>

      {/* <ResultsList data={data}/> */}
      {/* <ResultsList/> */}
      <ResultsList/>
    </div>
  )
}

export default App
