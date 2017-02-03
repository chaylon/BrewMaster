import React, {Component} from 'react';
import SearchForm from './SearchForm';
import BeerIndex from './BeerIndex';

class SearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchBrew: "",
      searchStyle: ""
    };
    this.handleSearchName = this.handleSearchName.bind(this);
    this.handleSearchBrew = this.handleSearchBrew.bind(this);
    this.handleSearchStyle = this.handleSearchStyle.bind(this);
  }

  handleSearchName(term) {
    this.setState({searchName: term});
  }

  handleSearchBrew(term) {
    this.setState({searchBrew: term});
  }

  handleSearchStyle(term) {
    this.setState({searchStyle: term});
  }

  render() {
    return(
      <div>
        <SearchForm
          handleSearchName = {this.handleSearchName}
          handleSearchBrew = {this.handleSearchBrew}
          handleSearchStyle = {this.handleSearchStyle}
        />
        <BeerIndex
          searchName = {this.state.searchName}
          searchBrew = {this.state.searchBrew}
          searchStyle = {this.state.searchStyle}
        />
      </div>
    );
  }
}

export default SearchApp;
