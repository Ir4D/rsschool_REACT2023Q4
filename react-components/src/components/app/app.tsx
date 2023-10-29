import { Component } from 'react';
import SearchPanel from '../search-panel/search-panel';
import ResultsList from '../results-list/results-list';
import './app.css';

type AppState = {
  term: string;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      term: '',
    };
  }

  updateData = (value: string) => {
    this.setState({
      term: value,
    });
  };

  render() {
    return (
      <div>
        <h1>React Components</h1>
        <SearchPanel updateData={this.updateData} />
        <ResultsList term={this.state.term} />
      </div>
    );
  }
}

export default App;
