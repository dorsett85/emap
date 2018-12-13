import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

// Custom components
import LoginContainer from './Login/LoginContainer';
import RegisterContainer from './Register/RegisterContainer';
import GameSelectorContainer from "./GameSelector/GameSelectorContainer";
import GamePlayContainer from './GamePlay/GamePlayContainer';

const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 350,
    maxHeight: '95vh',
    overflowY: 'auto',
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
        <LoginContainer
          user={props.user}
          setUser={props.setUser}
          setGame={props.setGame}
          setGameProgress={props.setGameProgress}
        />
        {!props.user.id && <RegisterContainer />}
        <GameSelectorContainer
          user={props.user}
          setGame={props.setGame}
          setGameProgress={props.setGameProgress}
        />
      </List>

      <Divider/>

      {props.selectedGame.id && (
        <GamePlayContainer
          user={props.user}
          selectedGame={props.selectedGame}
          gameProgress={props.gameProgress}
          setGameProgress={props.setGameProgress}
          guessResults={props.guessResults}
          updateGuessResults={props.updateGuessResults}
        />
      )}

    </div>
  );

};

export default withStyles(styles)(GamePanel);
