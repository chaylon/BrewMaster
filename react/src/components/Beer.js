import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';


class Beer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dropdownItems = [];
    this.props.lists.forEach((list) => {
        dropdownItems.push(<option key={`${list.id}`}>{list.name}</option>);
    });

    let dropdown = (
      <form className="form-inline">
        <select className="form-control form-control-sm" id="exampleSelect1">
          {dropdownItems}
        </select>
        <button type="submit" className="btn btn-sm btn-primary">Add</button>
      </form>
    );

    let beer = <a href={`beers/${this.props.beer.id}`}>{this.props.beer.name}</a>;
    let add = <span>Add</span>;

    return(
      <div>
        {beer}
        {dropdown}
      </div>
    );
  }
}

export default Beer;
