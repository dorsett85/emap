import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  }
});


const GamePlayTemp = props => {
  const { classes } = props;

  return (
    <Typography variant={'subheading'} align={'center'} classes={{ root: classes.maliFont }}>
      Under construction
    </Typography>
  );

};

export default withStyles(styles)(GamePlayTemp);
