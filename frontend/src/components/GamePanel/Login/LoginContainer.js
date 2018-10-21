import React from 'react';

import Login from "./Login";

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    // Bind methods
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      loggedIn: !this.loggedIn
    })
  }

  render() {
    return (
      <Login
        loggedIn={this.state.loggedIn}
        onClick={this.handleClick}
      />
    )
  }

}