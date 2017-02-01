import React, {Component} from 'react';

const SearchForm = props => {
  let handleNewSearch = (event) => {
    props.handleSearch(event.target.value);
  };

  return(
    <div>
    <input type='text' onChange={handleNewSearch} placeholder="Search" />
    </div>
  );
};

export default SearchForm;
