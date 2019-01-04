import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class SnackbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      messageInfo: {}
    };
    this.queue = [];

  }

  handleNewMsg(message) {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({open: false});
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  handleExited = () => {
    this.processQueue();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Show login and logout message
    const user = this.props.user;
    const prevUser = prevProps.user;
    if (prevUser.id !== user.id) {
      const msg = user.id ?
        `${user.name} you have successfully logged in!` :
        `${prevUser.name} you have successfully logged out`;
      this.handleNewMsg(msg);
    }

    // Show guess results message
    const msg = this.props.guessResults.msg;
    if (msg && (prevProps.guessResults.msg !== msg)) {
      this.handleNewMsg(msg);
    }
  }

  render() {
    return (
      <Snackbar
        key={this.state.messageInfo.key}
        open={this.state.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        autoHideDuration={6000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.messageInfo.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon/>
          </IconButton>,
        ]}
      />
    );
  }

}

export default SnackbarContainer
