import React, {Component} from 'react';
import BeerOnList from './BeerOnList';

class ListShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: null,
      beers: [],
      currentUser: null,
      selectionId: null,
      currentList: null
    };
    this.getBeers = this.getBeers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.findSelection = this.findSelection.bind(this);
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
      let newCurrentList = body.list;
      let newBeers = body.beers;
      this.setState({
        currentUser: newCurrentUser,
        beers: newBeers,
        listId: newListId,
        currentList: newCurrentList
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(selectionId) {
    fetch(`/api/v1/lists/${this.state.listId}/selections/${selectionId}`, {
      method: 'delete',
      credentials: 'same-origin'
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
    .then(response => {
      this.getBeers();
    });
  }

  findSelection(listId, beerId) {
    fetch(`/api/v1/lists/${listId}/beers/${beerId}/selections`, {
      credentials: 'same-origin'
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
      let newSelectionId = body.selection.id;
      this.setState({selectionId: newSelectionId});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let beers = this.state.beers.map((beer) => {

      let onDelete = () => {
        this.findSelection(this.state.listId, beer.id);
        this.handleDelete(this.state.selectionId);
      };

      return(
        <BeerOnList
          key = {beer.id}
          beer = {beer}
          list = {this.state.currentList}
          user = {this.state.currentUser}
          onDelete = {onDelete}
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
