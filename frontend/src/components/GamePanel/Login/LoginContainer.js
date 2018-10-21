import React from 'react';

import Login from "./Login";

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      expandLogin: false,
      username: '',
      password: ''
    };

    // Bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClick(e) {
    this.setState({
      expandLogin: !this.state.expandLogin
    });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Login
        loggedIn={this.state.loggedIn}
        expandLogin={this.state.expandLogin}
        onClick={this.handleClick}
        onInput={this.handleInput}
        username={this.state.username}
        password={this.state.password}
      />
    )
  }

}