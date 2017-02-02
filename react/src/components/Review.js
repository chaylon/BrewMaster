import React from 'react';

const Review = props => {

  let reviews = props.reviews.map((review) => {
    <div>{review.score} | {review.review}</div>;
  });

  return(
    <div>
      {reviews}
    </div>
  );
};

export default Review;
