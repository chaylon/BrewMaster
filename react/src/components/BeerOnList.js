import React from 'react';

const BeerOnList = (props) => {
  let beer = <a href={`/beers/${props.beer.id}`}>{props.beer.name}</a>;
  let brewery = <span> | {props.beer.brewery}</span>;

  return(
    <div>
      {beer}
      {brewery}
    </div>
  );
};

export default BeerOnList;
