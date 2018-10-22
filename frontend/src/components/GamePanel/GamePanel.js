import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 350,
    backgroundColor: 'white',
    boxShadow: theme.shadows[10],
    zIndex: 10
  },
  paper: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit / 2,
    textAlign: 'center',
    flexDirection: 'column',
  },
  maliFont: {
    fontFamily: 'Mali'
  }
});

import LoginContainer from './Login/LoginContainer';
import GameSelectorContainer from "./GameSelector/GameSelectorContainer";
import GamePlayContainer from './GamePlay/GamePlayContainer';


const GamePanel = props => {
  const {classes} = props;

  return (
    <div className={classes.panelContainer}>

      <Paper square classes={{root: classes.paper}}>
        <Typography variant="h4" color="inherit" classes={{root: classes.maliFont}}>
          World Geography
        </Typography>
        <Typography variant={'subtitle1'} color={'inherit'} classes={{root: classes.maliFont}}>
          Test your knowledge
        </Typography>
      </Paper>

      <List>
        <LoginContainer/>
        <GameSelectorContainer/>
      </List>

      <Divider/>

      <GamePlayContainer
        searchResults={props.searchResults}
        updateSearchResults={props.updateSearchResults}
      />

    </div>
  );

};

export default withStyles(styles)(GamePanel)