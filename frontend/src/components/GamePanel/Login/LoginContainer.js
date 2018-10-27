import React from 'react';

import Login from "./Login";
import csrf from "assets/utils/getCsrfToken";

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      loginError: null,
      username: '',
      password: ''
    };

    // Bind methods
    this.handleShowLoginClick = this.handleShowLoginClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleShowLoginClick(e) {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      loginError: null
    });
  };

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      loginError: null
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    fetch('/api/login/', {
      method: 'POST',
      body: `username=${this.state.username}&password=${this.state.password}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        if (data) {
          // Backend at this point has logged in the user
          this.setState({
            anchorEl: null,
            loginError: null
          });
          // need to reload the page so the csrf token resets!!
          location.reload()
        } else {
          this.setState({
            loginError: true
          })
        }
      })
      .catch(error => console.log(error));

  }

  handleLogoutClick(e) {
    e.preventDefault();

    fetch('/api/logout/', {
      method: 'POST',
      body: `logout=${true}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        // Backend has logged out the user, reset to null on the frontend
        this.props.setUser(data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Login
        user={this.props.user}
        onShowLoginClick={this.handleShowLoginClick}
        onClose={this.handleClose}
        onInput={this.handleInput}
        onLoginSubmit={this.handleLoginSubmit}
        onLogoutClick={this.handleLogoutClick}
        anchorEl={this.state.anchorEl}
        loginError={this.state.loginError}
        username={this.state.username}
        password={this.state.password}
      />
    )
  }

}