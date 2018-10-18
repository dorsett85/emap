import React from 'react';

import {PlaceSearch} from "./PlaceSearch";
import csrf from 'assets/utils/getCsrfToken';


export default class PlaceSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/', {
      method: 'POST',
      body: 'place=' + this.state.searchInput,
      headers: {
        "content-type":"application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => {
      response.json().then(data => {
        this.props.updateSearchResults(data)
      })
    })

  }

  render() {
    return (
      <PlaceSearch
        onInput={this.handleInput}
        onSubmit={this.handleSubmit}
        searchResults={this.props.searchResults}
      />
    )
  }
}
