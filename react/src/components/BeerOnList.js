import React from 'react';

const BeerOnList = (props) => {
  let beer = <a href={`/beers/${props.beer.id}`}>{props.beer.name}</a>;
  let brewery = <span> | {props.beer.brewery}</span>;
  let deleteButton = <span> | <a href="javascript:;" onClick={props.onDelete}>Remove</a></span>;

  return(
    <div>
      {beer}
      {brewery}
      {deleteButton}
    </div>
  );
};

export default BeerOnList;
