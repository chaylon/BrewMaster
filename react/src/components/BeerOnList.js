import React from 'react';

const BeerOnList = (props) => {
  let beer = <a href={`/beers/${props.beer.id}`}>{props.beer.name}</a>;

  return(
    <div>
      {beer}
    </div>
  );
};

export default BeerOnList;
