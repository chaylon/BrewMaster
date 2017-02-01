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
      let newLists = body.lists;
      let newBeers = [];
      body.beers.forEach((beer) => {
        newBeers.push(beer);
      });
      this.setState({
        beers: newBeers,
        currentUser: user,
        userLists: newLists,
      });
    })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // handleSubmit(b_id, l_id) {
  //   let data = {
  //     beer_id: b_id,
  //     list_id: l_id
  //   };
  //   let jsonStringData = JSON.stringify(data);
  //   fetch(`api/v1/lists/${l_id}`, {
  //     credentials: "same-origin",
  //     method: "post",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: jsonStringData
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }

  render() {
    let beers = this.state.beers.map((beer) => {

      // let handleSubmit = (list_id) => {
      //   return(
      //     this.handleSubmit(beer.id, list_id)
      //   );
      // };

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
