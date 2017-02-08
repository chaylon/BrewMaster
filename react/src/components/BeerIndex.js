import React, {Component} from 'react';
import Beer from './Beer';

const BeerIndex = props => {
  let beers = props.beers.map((beer) => {

    return(
      <div className="beers col-sm-6">
        <Beer
          key = {beer.id}
          beer = {beer}
          user = {props.currentUser}
          lists = {props.lists}
        />
      </div>
    );
  });

  beers = beers.sort(function(a,b) {
    return a.key - b.key;
  });

  return(
    <div>
      {beers}
    </div>
  );
};

export default BeerIndex;
