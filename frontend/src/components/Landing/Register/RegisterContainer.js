import React from 'react';

// Custom components
import Register from './Register';

import ajax from 'assets/utils/ajaxRequests';

export default class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      registered: null,
      registeredMsg: '',
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
        registerError: 'Passwords do not match'
      });
    } else if (this.state.username.length < 4 || this.state.password.length < 4) {
      return this.setState({
        registerError: 'Username and password must be at least 4 characters'
      });
    } else if (this.state.username.length > 12 || this.state.password.length > 12) {
      return this.setState({
        registerError: 'Username and password must be less than 12 characters'
      });
    }

    ajax.register({
      username: this.state.username,
      password: this.state.password,
      success: data => {
        if (!data.invalid) {
          // Backend at this point has logged in the user, but show a successfully registered message
          this.setState({
            registered: true,
            registeredMsg: data.name + ' successfully registered'
          });

          // need to reload the page so the csrf token resets!!
          setTimeout(() => {
            location.reload()
          }, 1500)
        } else if (data.invalid) {
          this.setState({
            registerError: data.invalid
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
        registered={this.state.registered}
        registeredMsg={this.state.registeredMsg}
        registerError={this.state.registerError}
        username={this.state.username}
        password={this.state.password}
        passwordConfirm={this.state.passwordConfirm}
      />
    );
  }

}
