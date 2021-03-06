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

    ajax.login({
      username: this.state.username,
      password: this.state.password,
      success: user => {
        if (!user.invalid) {
          this.props.setUser(user);
        } else if (data.invalid) {
          this.setState({
            loginError: data.invalid
          });
        }
      }
    });

  }

  render() {
    return (
      <Login
        onShowLoginClick={this.handleShowLoginClick}
        onClose={this.handleClose}
        onInput={this.handleInput}
        onLoginSubmit={this.handleLoginSubmit}
        anchorEl={this.state.anchorEl}
        loginError={this.state.loginError}
        username={this.state.username}
        password={this.state.password}
      />
    );
  }

}
