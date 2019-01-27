import React from 'react';
import Zoom from "@material-ui/core/Zoom";
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10
  },
  landingDiv: {
    position: 'inherit',
    right: 0,
    width: 350
  },
  headline: {
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
    textShadow: '2px 2px 8px #000000',
    paddingTop: theme.spacing.unit,
    textAlign: 'center',
    flexDirection: 'column',
  },
  maliFont: {
    fontFamily: 'Mali',
    fontWeight: 'bold'
  },
  btnGrp: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  logoutDiv: {
    position: 'inherit',
    right: 0
  }
});

const Landing = props => {
  const {classes} = props;

  return (
    (Boolean(props.user.set_user) && (
      <div className={classes.panelContainer}>
        <Zoom in={!Boolean(props.user.id)} mountOnEnter unmountOnExit>
          <div className={classes.landingDiv}>
            <div className={classes.headline}>
              <Typography variant="h4" color="inherit" classes={{root: classes.maliFont}}>
                World Geography
              </Typography>
              <Typography variant={'subtitle1'} color={'inherit'} classes={{root: classes.maliFont}}>
                Test your knowledge
              </Typography>
            </div>

            {/* Login and register buttons */}
            <div className={classes.btnGrp}>
              {props.children[0]}
              {props.children[1]}
            </div>

          </div>
        </Zoom>
        {/* Logout Buttons */}
        <Zoom in={Boolean(props.user.id)} mountOnEnter unmountOnExit>
          <div className={classes.logoutDiv}>
            {props.children[2]}
          </div>
        </Zoom>
      </div>
    ))
  )

};

export default withStyles(styles)(Landing);
