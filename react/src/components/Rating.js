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
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let url = window.location.href.split("/");
    let newBeerId = url[url.length - 1];
    this.getRatings(newBeerId);
  }

  onSubmit(beerId, userId, score, review) {
    let data = {
      beer_id: beerId,
      user_id: userId,
      score: score,
      review: review
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
    .then(response => {
      this.getRatings(this.state.beer.id);
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

  handleDelete(beerId, ratingId) {
    fetch(`/api/v1/beers/${beerId}/ratings/${ratingId}`, {
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
      this.getRatings(this.state.beer.id);
    });
  }

  render() {
    let handleSubmit = (event) => {
      event.preventDefault();
      this.onSubmit(
        this.state.beer.id,
        this.state.currentUser.id,
        event.target[0].valueAsNumber,
        event.target[1].value
      );
    };

    let rating;
    if (this.state.score !== null) {
      rating = <p>Rating: {this.state.score}</p>;
    }

    return(
      <div className="review-form">
        {rating}
        <RatingForm
          handleSubmit = {handleSubmit}
        />
        <Review
          ratings = {this.state.ratings}
          user = {this.state.currentUser}
          beer = {this.state.beer}
          handleDelete = {this.handleDelete}
        />
      </div>
    );
  }
}

export default Rating;
