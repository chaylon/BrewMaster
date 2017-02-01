import React, {Component} from 'react';
import SearchForm from './SearchForm';
import BeerIndex from './BeerIndex';

class SearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(term) {
    this.setState({search: term});
  }

  render() {

    let a = "help";
    return(
      <div>
        <SearchForm
          handleSearch = {this.handleSearch}
          test = {a}
        />
        <BeerIndex
          search = {this.state.search}
        />
      </div>
    );
  }
}

export default SearchApp;
