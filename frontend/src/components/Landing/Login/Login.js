import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import PublicIcon from '@material-ui/icons/Public';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  loginPopover: {
    width: 350
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  loginError: {
    color: '#f44336'
  }
});


const Login = props => {
  const {classes} = props;

  return (
    <div>
      <Tooltip title="Login" aria-label="Login">
        <Fab
          className={classes.fab}
          aria-owns='loginPopover'
          aria-haspopup="true"
          onClick={props.onShowLoginClick}
        >
          <PublicIcon/>
        </Fab>
      </Tooltip>
      <Popover
        id="loginPopover"
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 0,
        }}
        transformOrigin={{
          vertical: -5,
          horizontal: 0
        }}
      >
        <Card classes={{root: classes.loginPopover}}>
          <CardContent>
            <form onSubmit={props.onLoginSubmit}>
              <TextField
                id="username"
                label="Username"
                name={'username'}
                fullWidth
                value={props.username}
                onInput={props.onInput}
              />
              <TextField
                id="password"
                label="Password"
                name={'password'}
                fullWidth
                value={props.password}
                onInput={props.onInput}
              />
              <Button type={'submit'} fullWidth variant={'contained'} classes={{root: classes.button}}>
                Login
              </Button>
              {props.loginError && (
                <FormHelperText className={classes.loginError}>
                  {props.loginError}
                </FormHelperText>
              )}
            </form>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );

};

export default withStyles(styles)(Login)
