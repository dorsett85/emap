import React from 'react';

// Custom components
import Login from './Login';

import ajax from 'assets/utils/ajaxRequests';

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

    ajax.login(this.state.username, this.state.password, data => {
      if (data) {
        // Backend at this point has logged in the user
        this.setState({
          anchorEl: null,
          loginError: null
        });
        // need to reload the page so the csrf token resets!!
        location.reload();
      } else {
        this.setState({
          loginError: true
        });
      }
    });

  }

  handleLogoutClick(e) {
    e.preventDefault();

    ajax.logout(data => {
      // Backend has logged out the user, reset to null on the frontend
      this.props.setUser(data);
    });
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
    );
  }

}
