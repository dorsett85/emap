import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  fab: {
    margin: theme.spacing.unit * 2
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
  },
  registeredDiv: {
    display: 'flex',
    justifyContent: 'center'
  },
  registeredChipIcon: {
    color: theme.palette.common.white
  },
  registeredChipTxt: {
    backgroundColor: '#4CAF50',
    color: theme.palette.common.white,
    fontSize: '14px'
  }
});


const Register = props => {
  const {classes} = props;

  return (
    <div>
      <Tooltip title="Register" aria-label="Register">
        <Fab
          className={classes.fab}
          aria-owns='registerPopover'
          aria-haspopup="true"
          onClick={props.onShowRegisterClick}
        >
          <PersonAddIcon/>
        </Fab>
      </Tooltip>
      <Popover
        id="registerPopover"
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
              <Button type={'Register'} fullWidth variant={'contained'}
                      classes={{root: classes.button}}>
                Register
              </Button>
              {props.registerError && (
                <FormHelperText className={classes.registerError}>
                  {props.registerError}
                </FormHelperText>
              )}
            </form>
            <Collapse
              in={props.registered}
            >
              <div className={classes.registeredDiv}>
                <Chip
                  icon={<CheckCircleIcon/>}
                  label={props.registeredMsg}
                  classes={{root: classes.registeredChipTxt, icon: classes.registeredChipIcon}}
                />
              </div>
            </Collapse>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );

};

export default withStyles(styles)(Register);
