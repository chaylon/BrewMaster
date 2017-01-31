import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';


class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {lists: []};
  }

  render() {
    let dropdownItems = [];
    this.state.lists.forEach((list) => {
        dropdownItems.push(<MenuItem eventKey={`${list.id}`}>{list.name}</MenuItem>);
    });

    let dropdown = (
      <DropdownButton bsSize="xsmall" title="Choose a List" id="dropdown-size-extra-small">
        {dropdownItems}
      </DropdownButton>
    );
    let beer = <a href={`beers/${this.props.beer.id}`}>{this.props.beer.name}</a>;
    let add = <span>Add</span>;

    return(
      <div>
        {beer} | {add} | {dropdown}
      </div>
    );
  }
}

export default Beer;
