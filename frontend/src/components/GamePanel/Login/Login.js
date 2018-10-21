import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 15px 10px 15px',
  },
  selectGame: {
    flexGrow: 1,
    marginRight: theme.spacing.unit
  },
  maliFont: {
    fontFamily: 'Mali'
  }
});


const Login = props => {
  const {classes} = props;

  return (
    <div className={classes.container}>
      <div>
        <Typography classes={{root: classes.maliFont}}>
          Track progress by logging in
        </Typography>
      </div>
      <Button variant={'outlined'}>
        Login
      </Button>
    </div>
  );

};

export default withStyles(styles)(Login)