import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ListIndex from './components/ListIndex';
import SearchApp from './components/SearchApp';
import ListShow from './components/ListShow';

$(function() {
  if (document.getElementById('ListIndex')) {
    ReactDOM.render(
      <ListIndex/>,
      document.getElementById('ListIndex')
    );
  } else if (document.getElementById('BeerIndex')){
    ReactDOM.render(
      <SearchApp/>,
      document.getElementById('BeerIndex')
    );
  } else if (document.getElementById('ListShow')){
    ReactDOM.render(
      <ListShow/>,
      document.getElementById('ListShow')
    );
  }
});
