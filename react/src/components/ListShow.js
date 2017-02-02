import React, {Component} from 'react';
import BeerOnList from './BeerOnList';

class ListShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: null,
      beers: [],
      currentUser: null
    };
    this.getBeers = this.getBeers.bind(this);
  }

  componentDidMount() {
    this.getBeers();
  }

  getBeers() {
    let url = window.location.href.split("/");
    let newListId = url[url.length - 1];
    fetch(`/api/v1/lists/${newListId}`,
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
      let newCurrentUser = body.user;
      let newBeers = body.beers;
      this.setState({
        currentUser: newCurrentUser,
        beers: newBeers,
        listId: newListId,
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let beers = this.state.beers.map((beer) => {
      return(
        <BeerOnList
          key = {beer.id}
          beer = {beer}
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

export default ListShow;
