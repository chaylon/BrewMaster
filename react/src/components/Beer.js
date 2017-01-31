import React from 'react';

const Beer = props => {
  let beer = <a href={`beers/${props.beer.id}`}>{props.beer.name}</a>;
  let add = <span>Add</span>;

  return(
    <div>
      {beer} | {add}
    </div>
  );
};

export default Beer;
