import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ListIndex from './components/ListIndex';
import SearchApp from './components/SearchApp';
import ListShow from './components/ListShow';
import Rating from './components/Rating';

$(function() {
  if (document.getElementById('ListIndex')){
    ReactDOM.render(
      <ListIndex/>,
      document.getElementById('ListIndex')
    );
  }
  if (document.getElementById('BeerIndex')){
    ReactDOM.render(
      <SearchApp/>,
      document.getElementById('BeerIndex')
    );
  }
  if (document.getElementById('ListShow')){
    ReactDOM.render(
      <ListShow/>,
      document.getElementById('ListShow')
    );
  }
  if (document.getElementById('Rating')){
    ReactDOM.render(
      <Rating/>,
      document.getElementById('Rating')
    );
  }
});
