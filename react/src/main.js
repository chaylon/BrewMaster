import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ListIndex from './components/ListIndex';

$(function() {
  if (document.getElementById('ListIndex')){
    ReactDOM.render(
      <ListIndex/>,
      document.getElementById('ListIndex')
    );
  }
});
