import React from 'react';

// Custom components
import Register from './Register';

import ajax from 'assets/utils/ajaxRequests';

export default class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      registerError: null,
      username: '',
      password: '',
      passwordConfirm: ''
    };

    // Bind methods
    this.handleShowRegisterClick = this.handleShowRegisterClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleShowRegisterClick(e) {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      registerError: null
    });
  };

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      registerError: null
    });
  }

  handleRegisterSubmit(e) {
    e.preventDefault();

    // Frontend validation
    if (this.state.password !== this.state.passwordConfirm) {
      return this.setState({
        registerError: 'Password and confirmation do not match'
      });
    }

    ajax.register({
      username: this.state.username,
      password: this.state.password,
      success: data => {
        if (data) {
          // Backend at this point has logged in the user
          this.setState({
            anchorEl: null,
            registerError: null
          });
          // need to reload the page so the csrf token resets!!
          location.reload();
        } else {
          this.setState({
            registerError: 'invalid'
          });
        }
      }
    });

  }

  render() {
    return (
      <Register
        onShowRegisterClick={this.handleShowRegisterClick}
        onClose={this.handleClose}
        onInput={this.handleInput}
        onRegisterSubmit={this.handleRegisterSubmit}
        anchorEl={this.state.anchorEl}
        registerError={this.state.registerError}
        username={this.state.username}
        password={this.state.password}
        passwordConfirm={this.state.passwordConfirm}
      />
    );
  }

}
