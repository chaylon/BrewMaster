import React from 'react';

const Review = props => {

  let ratings = props.ratings.map((rating) => {
    let handleDelete = () => {
      props.handleDelete(props.beer.id, rating.id);
    };

    let deleteButton;

    if (props.user.id === rating.user_id) {
      deleteButton = <span><a href="javascript:;" onClick={handleDelete}>Delete</a></span>;
    }
    return(
      <div key={rating.id}>{rating.score} | {rating.review} | {deleteButton}</div>
    );
  });

  return(
    <div>
      {ratings}
    </div>
  );
};

export default Review;
