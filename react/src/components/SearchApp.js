import React, {Component} from 'react';
import SearchForm from './SearchForm';
import BeerIndex from './BeerIndex';
import ReactPaginate from 'react-paginate';

class SearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchBrew: "",
      searchStyle: "",
      beers: [],
      lists: [],
      currentUser: null,
      numBeers: null,
      page: 1
    };
    this.handleSearchName = this.handleSearchName.bind(this);
    this.handleSearchBrew = this.handleSearchBrew.bind(this);
    this.handleSearchStyle = this.handleSearchStyle.bind(this);
    this.filterBeers = this.filterBeers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
    this.setState({searchBrew: term}, () => {
      this.filterBeers();
      }
    );
  }

  handleSearchStyle(term) {
    this.setState({searchStyle: term}, () => {
      this.filterBeers();
      }
    );
  }

  filterBeers() {
    let name = this.state.searchName;
    let brew = this.state.searchBrew;
    let style = this.state.searchStyle;
    let page = this.state.page;
    fetch(`/api/v1/beers/filter?name_search=${name}&brew_search=${brew}&style_search=${style}&page=${page}`, {
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
      let numBeers = body.numBeers;
      this.setState({
        beers: beers,
        lists: lists,
        currentUser: user,
        numBeers: numBeers
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handlePageChange(data) {
    let page = data.selected + 1;
    this.setState({page: page}, () => {
      this.filterBeers();
    });
  }

  render() {

    return(
      <div>
        <div className="search-bar">
          <h3>Search for beers!</h3>
          <SearchForm
            handleSearchName = {this.handleSearchName}
            handleSearchBrew = {this.handleSearchBrew}
            handleSearchStyle = {this.handleSearchStyle}
          />
        </div>
        <BeerIndex
          searchName = {this.state.searchName}
          searchBrew = {this.state.searchBrew}
          searchStyle = {this.state.searchStyle}
          beers = {this.state.beers}
          currentUser = {this.state.currentUser}
          lists = {this.state.lists}
        />
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="javascript:;">...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.numBeers/10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default SearchApp;
