import React, {Component} from 'react';
import Beer from './Beer';

class BeerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      userLists: [],
      currentUser: null
    };
    this.filterBeers = this.filterBeers.bind(this);
  }

  componentDidMount() {
    this.filterBeers();
  }

  filterBeers() {
    let name = this.props.searchName;
    let brew = this.props.searchBrew;
    let style = this.props.searchStyle;
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

    let beers = this.state.beers.map((beer) => {

      return(
        <Beer
          key = {beer.id}
          beer = {beer}
          user = {this.state.currentUser}
          lists = {this.state.userLists}
        />
      );
    });

    beers = beers.sort(function(a,b) {
      return a.key - b.key;
    });

    return(
      <div>
        {beers}
      </div>
    );
  }
}

export default BeerIndex;
