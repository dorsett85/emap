import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  userDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
      <ListItem
        button={!props.user}
        aria-owns='loginPopover'
        aria-haspopup="true"
        onClick={e => !props.user ? props.onShowLoginClick(e) : null}
      >
        <Avatar>
          <PersonIcon/>
        </Avatar>
        <ListItemText
          primary={props.user
            ? (
              <div className={classes.userDiv}>
                <span>{props.user}</span>
                <Button variant={'outlined'} onClick={props.onLogoutClick}>Logout</Button>
              </div>
            )
            : 'Login'}
          secondary={props.user ? '' : 'Track your progress'}
          classes={{primary: classes.maliFont}}
        />
      </ListItem>
      <Popover
        id="loginPopover"
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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
                  Invalid username or password
                </FormHelperText>
              )}
            </form>
          </CardContent>
        </Card>
      </Popover>
      <Divider inset component={'li'}/>
    </div>
  );

};

export default withStyles(styles)(Login)