import { ChangeEvent, Component } from "react";

type SearchPanelProps = {
  updateData: (value: string) => void;
};

class SearchPanel extends Component<SearchPanelProps> {
  state = {
    inputValue: ''
  };

  searchNewResults = () => {
    this.props.updateData(this.state.inputValue);
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <div className="search-panel">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Type here"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
  
        <button 
          type="submit"
          className="search-btn"
          onClick={this.searchNewResults}
        >Search</button>
      </div>
    )
  }
}

export default SearchPanel;