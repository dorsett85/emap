import React from 'react';

import Login from "./Login";
import csrf from "assets/utils/getCsrfToken";

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      anchorEl: null,
      username: '',
      password: ''
    };

    // Bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/login/', {
      method: 'POST',
      body: `username=${this.state.username}&password=${this.state.password}`,
      headers: {
        "content-type":"application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.setUser(data);
        location.reload(); // Reload the page so the csrf token resets!!
      })
      .catch(error => console.log(error));

    // TODO add login submission
    this.setState({
      anchorEl: null
    })
  }

  render() {
    return (
      <Login
        user={this.props.user}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onInput={this.handleInput}
        onSubmit={this.handleSubmit}
        anchorEl={this.state.anchorEl}
        username={this.state.username}
        password={this.state.password}
      />
    )
  }

}