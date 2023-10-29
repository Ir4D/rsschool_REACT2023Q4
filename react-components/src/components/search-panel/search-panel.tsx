import { ChangeEvent, Component } from "react";

class SearchPanel extends Component {
  state = {
    inputValue: ''
  };

  searchNewResults = () => {
    console.log(this.state.inputValue);
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
            onClick={this.searchNewResults}>Search</button>
      </div>
    )
  }
}

export default SearchPanel;