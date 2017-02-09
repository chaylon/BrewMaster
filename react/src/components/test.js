import React, { Component } from 'react';
import Thing from "./Thing";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thingData: [],
      selectedThingID: null,
      currentUser: null,
    };
    this.fetching = this.fetching.bind(this)
    this.handleThingClick = this.handleThingClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleThingDelete = this.handleThingDelete.bind(this)
  }

  handleThingClick(id) {
    let selectedID = id;
    if(id === this.state.selectedThingID){
      selectedID = null
    }
    this.setState({selectedThingID: selectedID})
  }

  handleSubmit(thingID){
    let data = {
      finder_id: this.state.currentUser,
      thing_id: thingID
    }
    let json = JSON.stringify(data);
    fetch(`/api/v1/things/${thingID}/chosen`, {
      credentials: "include",
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: json
    })
    .then(response=>{
      this.fetching();
    })
  }

  handleThingDelete(thingID){
    fetch(`/api/v1/things/${thingID}`,{
      credentials: "include",
      method: "delete",
    })
    .then(response=>{
      this.fetching()
    })
  }

  fetching () {
    fetch('/api/v1/things', {
      credentials: "include",
    })
    .then(response => {
      if (response.ok) {
        return response;
      }
    })
    .then(response => response.json())
    .then(body => {
      let data = body;
      let user = body.user;
      this.setState({
        thingData: data
        currentUser: user
      });
    });
  }

  componentDidMount() {
    this.fetching();
    setInterval(
      this.fetching, 100000);
  }

  render(){

    let things;
    if (this.state.thingData) {
      things = this.state.thingData.map(thing => {
        let className='col-lg-4';

        let selected;
          if(thing.id === this.state.selectedThingID){
            selected = true;
          }

        let onThingClick = () =>{
          this.handleThingClick(thing.id)
        }

        let onSubmit = (event) =>{
          event.preventDefault();
          this.handleSubmit(thing.id)
        }

        let onDelete = (event) => {
          event.preventDefault();
          this.handleThingDelete(thing.id)
        }

        return(
          <div key={thing.id} className={className}>
            <a href="javascript:;" onClick={onThingClick}>
            <h3 className="text-center">{thing.name}</h3></a>
            < Thing
              thing={thing}
              selectedID = {this.state.selectedThingID}
              date={thing.date}
              days={thing.days}
              onSubmit={onSubmit}
              onDelete = {onDelete}
              currentUser = {this.state.currentUser}
              />
          </div>
        );
      })
    }

    return (
      <div>
        {things}
      </div>
    )
  }
}

export default List;
