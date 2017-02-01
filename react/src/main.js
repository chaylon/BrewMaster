import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ListIndex from './components/ListIndex';
import BeerIndex from './components/BeerIndex';
import SearchForm from './components/SearchForm';

$(function() {
  if (document.getElementById('ListIndex')) {
    ReactDOM.render(
      <ListIndex/>,
      document.getElementById('ListIndex')
    );
  } else if (document.getElementById('BeerIndex')){
    ReactDOM.render(
      <SearchForm/>,
      document.getElementById('BeerIndex')
    );
  }
});
