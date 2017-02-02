import React, {Component} from 'react';
import RatingForm from './RatingForm';
import Review from './Review';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      ratings: [],
      currentUser: null,
      beer: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getRatings = this.getRatings.bind(this);
  }

  componentDidMount() {
    let url = window.location.href.split("/");
    let newBeerId = url[url.length - 1];
    this.getRatings(newBeerId);
  }

  onSubmit(beerId, userId) {
    let data = {
      beer_id: beerId,
      user_id: userId
    };
    let jsonStringData = JSON.stringify(data);
    fetch(`/api/v1/beers/${beerId}/ratings`, {
      credentials: "same-origin",
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: jsonStringData
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
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getRatings(beerId) {
    fetch(`/api/v1/beers/${beerId}/ratings`, {
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
      let newScore = body.score;
      let newCurrentUser = body.user;
      let newRatings = [];
      let newBeer = body.beer;
      body.ratings.forEach((rating) => {
        newRatings.push(rating);
      });
      this.setState({
        score: newScore,
        currentUser: newCurrentUser,
        ratings: newRatings,
        beer: newBeer
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let handleSubmit = (event) => {
      event.preventDefault();
      this.onSubmit(this.state.beer.id, this.state.currentUser.id);
    };

    return(
      <div>
        Rating: {this.state.score}
        <RatingForm
          handleSubmit = {handleSubmit}
        />
        <Review
          reviews = {this.state.reviews}
        />
      </div>
    );
  }
}

export default Rating;
