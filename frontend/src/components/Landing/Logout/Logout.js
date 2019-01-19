import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import ExitIcon from '@material-ui/icons/ExitToApp';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  }
});


const Login = props => {
  const {classes} = props;

  return (
    <Tooltip title="Logout" aria-label="Logout">
      <Fab className={classes.fab} onClick={props.onLogoutClick}>
        <ExitIcon/>
      </Fab>
    </Tooltip>
  );

};

export default withStyles(styles)(Login)
