import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
  registerPopover: {
    width: 350
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  registerError: {
    color: '#f44336'
  }
});


const Register = props => {
  const {classes} = props;

  return (
    <div>
      <ListItem
        button={true}
        aria-owns='RegisterPopover'
        aria-haspopup="true"
        onClick={props.onShowRegisterClick}
      >
        <Avatar>
          <PersonAddIcon/>
        </Avatar>
        <ListItemText
          primary={'Register'}
          classes={{primary: classes.maliFont}}
        />
      </ListItem>
      <Popover
        id="RegisterPopover"
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Card classes={{root: classes.registerPopover}}>
          <CardContent>
            <form onSubmit={props.onRegisterSubmit}>
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
              <TextField
                id="passwordConfirm"
                label="Confirm Password"
                name={'passwordConfirm'}
                fullWidth
                value={props.passwordConfirm}
                onInput={props.onInput}
              />
              <Button type={'Register'} fullWidth variant={'contained'} classes={{root: classes.button}}>
                Register
              </Button>
              {props.registerError && (
                <FormHelperText className={classes.registerError}>
                  {props.registerError}
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

export default withStyles(styles)(Register)
