import { Component } from 'react';
import SearchPanel from '../search-panel/search-panel';
import ResultsList from '../results-list/results-list';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
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
        <h1 className="app-heading">Star Wars Planets:</h1>
        <SearchPanel updateData={this.updateData} />
        <ErrorBoundary>
          <ResultsList term={this.state.term} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
