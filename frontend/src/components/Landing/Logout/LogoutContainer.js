import React from 'react';

// Custom components
import Logout from "./Logout";

import ajax from "assets/utils/ajaxRequests";


export default class LogoutContainer extends React.Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(e) {
    e.preventDefault();

    ajax.logout({
      success: data => {
        // Backend has logged out the user, reset to null on the frontend
        this.props.setUser(data);
        this.props.setGame({});
      }
    });
  }

  render() {
    return (
      <Logout
        onLogoutClick={this.handleLogoutClick}
      />
    );
  }
}
