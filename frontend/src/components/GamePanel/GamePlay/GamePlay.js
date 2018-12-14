import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  gameDiv: {
    padding: 10
  }
});

const GamePlay = props => {
  const { classes } = props;

  // Show a progress subheader
  const gameProgress = `${props.selectedGame.progress.length}/${props.selectedGame.num_answers}`;

  return (
    <div className={classes.gameDiv}>
      <Typography variant={'h6'} align={'center'} classes={{ root: classes.maliFont }}>
        {props.selectedGame.title}
      </Typography>
      <Typography variant={'subheading'} align={'center'} classes={{ root: classes.maliFont }}>
          Progress: {gameProgress}
        </Typography>
      <div>
        {props.children}
      </div>
    </div>
  )
};

export default withStyles(styles)(GamePlay);
