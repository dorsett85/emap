import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from "@material-ui/core/Grow";
import {green, red} from "@material-ui/core/colors";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  gamePlayContainer: {
    marginTop: theme.spacing.unit * 2
  },
  defaultProgressColor: {
    color: theme.palette.common.black
  },
  correctProgressColor: {
    fontWeight: 1000,
    color: green[400]
  },
  incorrectProgressColor: {
    fontWeight: 1000,
    color: red[400]
  },
  maliFont: {
    fontFamily: 'Mali'
  }
});

const GamePlay = props => {
  const { classes } = props;

  // Show a progress subheader
  const answerTotal = props.selectedGame.num_answers;
  const showProgress = props.showProgress === null || props.showProgress;
  const progressColor = !props.showProgress
    ? 'defaultProgress'
    : props.guessResults.new
      ? 'correctProgressColor'
      : 'incorrectProgressColor'
  ;
  const progress = (
    <Grow
      in={showProgress}
      timeout={{
        enter: 500,
        exit: 0
      }}
    >
      <span className={classes[progressColor]}>
        {props.selectedGame.progress.length}
      </span>
    </Grow>
  );

  return (
    <Grid container className={classes.gamePlayContainer}>
      <Grid item xs={12}>
        <Typography variant={'subheading'} align={'center'} classes={{ root: classes.maliFont }}>
          Progress: {progress}/{answerTotal}
        </Typography>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(GamePlay);
