import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School';


const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '350px',
    backgroundColor: 'white',
    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)',
    zIndex: 10
  },
  toolbar: {
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

      <AppBar position={'static'}>
        <Toolbar variant={'dense'} classes={{root: classes.toolbar}}>
          <Typography variant="h4" color="inherit" classes={{root: classes.maliFont}}>
            World Geography
          </Typography>
          <Typography variant={'subtitle1'} color={'inherit'} classes={{root: classes.maliFont}}>
            Test your knowledge
          </Typography>
        </Toolbar>
      </AppBar>


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