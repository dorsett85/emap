import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  loginDropdown: {
    backgroundColor: '#81D4FA'
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});


const Login = props => {
  const {classes} = props;

  return (
    <div>
      <ListItem button onClick={props.onClick}>
        <Avatar>
          <PersonIcon/>
        </Avatar>
        <ListItemText
          primary={'Login'}
          secondary={'Track your progress'}
          classes={{primary: classes.maliFont}}
        />
      </ListItem>
      <Collapse in={props.expandLogin}>
        <ListItem classes={{root: classes.loginDropdown}}>
          <div>
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
          </div>
        </ListItem>
      </Collapse>
      <Divider inset component={'li'}/>
    </div>
  );

};

export default withStyles(styles)(Login)