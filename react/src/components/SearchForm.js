import React, {Component} from 'react';

const SearchForm = props => {
  let handleSearchName = (event) => {
    props.handleSearchName(event.target.value);
  };

  let handleSearchBrew = (event) => {
    props.handleSearchBrew(event.target.value);
  };

  let handleSearchStyle = (event) => {
    props.handleSearchStyle(event.target.value);
  };

  let nameSearch = <span><input type='text' onChange={handleSearchName} placeholder="Name" /></span>;
  let brewSearch = <span><input type='text' onChange={handleSearchBrew} placeholder="Brewery" /></span>;
  let styleSearch = <span><input type='text' onChange={handleSearchStyle} placeholder="Style" /></span>;

  return(
    <div>
      {nameSearch} | {brewSearch} | {styleSearch}
    </div>
  );
};

export default SearchForm;
