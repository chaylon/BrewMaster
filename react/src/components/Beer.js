import React, {Component} from 'react';

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: "",
      listText: "Choose a list"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newId = parseInt(event.target.selectedOptions[0].id);
    let newText = event.target.value;
    this.setState({listId: newId, listText: newText});
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      beer_id: this.props.beer.id,
      list_id: this.state.listId
    };

    let jsonStringData = JSON.stringify(data);
    fetch(`api/v1/lists/${this.state.listId}/selections`, {
      credentials: "same-origin",
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: jsonStringData
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let dropdownItems = [];
    this.props.lists.forEach((list) => {
        dropdownItems.push(<option id={`${list.id}`} key={`${list.id}`}>{list.name}</option>);
    });

    let dropdown = (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <select value={this.state.listText} className="form-control form-control-sm" onChange={this.handleChange}>
          <option>Choose a list</option>
          {dropdownItems}
        </select>
        <button type="submit" className="btn btn-sm btn-primary">Add</button>
      </form>
    );

    let beer = <a href={`beers/${this.props.beer.id}`}>{this.props.beer.name}</a>;

    return(
      <div>
        {beer}
        {dropdown}
      </div>
    );
  }
}

export default Beer;
