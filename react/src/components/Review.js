import React from 'react';

const Review = props => {

  let ratings = props.ratings.map((rating) => {
    return(
      <div key={rating.id}>{rating.score} | {rating.review}</div>
    );
  });

  return(
    <div>
      {ratings}
    </div>
  );
};

export default Review;
