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
    this.getBeers = this.getBeers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getBeers();
    setInterval(this.getLists, 30000);
  }

  getBeers() {
    fetch(
      'api/v1/beers',
      {credentials: "same-origin"}
    )
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
      let user = body.currentUser;
      let newBeers = [];
      body.beers.forEach((beer) => {
        newBeers.push(beer);
      });
      this.setState({
        beers: newBeers,
        currentUser: user
      });
    })
    .then(response => {
      fetch(
        `api/v1/users/${this.state.currentUser.id}`,
        {credentials: "same-origin"}
      )
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
        let newLists = [];
        body.lists.forEach((list) => {
          newLists.push(list);
        });
        this.setState({userLists: newLists});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    });
  }

  handleClick() {

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

    return(
      <div>
        {beers}
      </div>
    );
  }
}

export default BeerIndex;
