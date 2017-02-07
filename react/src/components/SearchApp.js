import React, {Component} from 'react';
import SearchForm from './SearchForm';
import BeerIndex from './BeerIndex';

class SearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchBrew: "",
      searchStyle: "",
      beers: [],
      lists: [],
      currentUser: null
    };
    this.handleSearchName = this.handleSearchName.bind(this);
    this.handleSearchBrew = this.handleSearchBrew.bind(this);
    this.handleSearchStyle = this.handleSearchStyle.bind(this);
    this.filterBeers = this.filterBeers.bind(this);
  }

  componentDidMount() {
    this.filterBeers();
  }

  handleSearchName(term) {
    this.setState({searchName: term}, () => {
      this.filterBeers();
      }
    );
  }

  handleSearchBrew(term) {
    this.setState({searchBrew: term});
  }

  handleSearchStyle(term) {
    this.setState({searchStyle: term});
  }

  filterBeers() {
    let name = this.state.searchName;
    let brew = this.state.searchBrew;
    let style = this.state.searchStyle;
    fetch(`/api/v1/beers/filter?name_search=${name}&brew_search=${brew}&style_search=${style}`, {
      credentials: "same-origin"
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let beers = body.beers;
      let lists = body.lists;
      let user = body.currentUser;
      this.setState({
        beers: beers,
        userLists: lists,
        currentUser: user
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
          beers = {this.state.beers}
          currentUser = {this.state.currentUser}
          lists = {this.state.lists}
        />
      </div>
    );
  }
}

export default SearchApp;
