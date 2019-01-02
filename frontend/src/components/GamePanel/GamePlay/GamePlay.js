import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  gameDiv: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    width: '100%'
  }
});

const GamePlay = props => {
  const { classes } = props;

  // Show a progress subheader
  const gameProgress = `${props.selectedGame.progress.length}/${props.selectedGame.num_answers}`;

  return (
    <div className={classes.gameDiv}>
      <Typography variant={'subheading'} align={'center'} classes={{ root: classes.maliFont }}>
        Progress: {gameProgress}
      </Typography>
      {props.children}
    </div>
  );
};

export default withStyles(styles)(GamePlay);
