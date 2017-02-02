import React from 'react';

const BeerOnList = (props) => {
  let beer = <a href={`/beers/${props.beer.id}`}>{props.beer.name}</a>;
  let brewery = <span> | {props.beer.brewery}</span>;

  let deleteButton;
  if (props.user.id === props.list.user_id) {
    deleteButton = <span> | <a href="javascript:;" onClick={props.onDelete}>Remove</a></span>;
  }

  return(
    <div>
      {beer}
      {brewery}
      {deleteButton}
    </div>
  );
};

export default BeerOnList;
