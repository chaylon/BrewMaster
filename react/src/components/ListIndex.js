import React, {Component} from 'react';
import List from './List';

class ListIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      currentUser: null
    };
    this.getLists = this.getLists.bind(this);
  }
  componentDidMount() {
    this.getLists();
    setInterval(this.getLists, 15000);
  }

  getLists() {
    fetch('api/v1/lists',
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
      let newCurrentUser = body.user;
      body.lists.forEach((list) => {
        newLists.push(list);
      });
      this.setState({
        lists: newLists,
        currentUser: newCurrentUser
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(listId) {
    fetch(`api/v1/lists/${listId}`, {
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
      this.getLists();
    });

  }

  render() {
    let lists = this.state.lists.map((list) => {

      let handleDeleteList = () => {
          this.handleDelete(list.id);
      };

      return(
        <List
          key = {list.id}
          list = {list}
          user = {this.state.currentUser}
          handleDelete = {handleDeleteList}
        />
      );
    });


    lists = lists.sort(function(a,b) {
      return b.key - a.key;
    });

    return(
      <div>
        {lists}
      </div>
    );
  }
}

export default ListIndex;
