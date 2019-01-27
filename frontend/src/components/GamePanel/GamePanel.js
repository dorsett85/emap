import React from 'react';
import Slide from "@material-ui/core/Slide";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Dialog, DialogTitle, DialogContent} from "@material-ui/core";
import {List, ListItem} from "@material-ui/core";
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

// Custom components
import GamePlayContainer from './GamePlay/GamePlayContainer';
import GameIcon from './GameIcon';

const styles = theme => ({
  container: {
    position: 'absolute',
    zIndex: 10
  },
  gamePanelContainer: {
    width: 350,
    maxHeight: '100vh',
    overflowY: 'auto',
    backgroundColor: 'white',
    boxShadow: theme.shadows[15]
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
  },
  gamePanelGrid: {
    padding: theme.spacing.unit * 2
  },
  selectInputItem: {
    display: 'flex'
  },
  selectInputItemText: {
    paddingLeft: theme.spacing.unit
  },
  progressBar: {
    marginTop: theme.spacing.unit * 3
  }
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}


const GamePanel = props => {
  const {classes} = props;

  // Show loader if the game hasn't been set
  let gameContent;
  if (props.fetching) {
    gameContent = (
      <LinearProgress className={classes.progressBar}/>
    );
  } else {
    gameContent = props.selectedGame.id && (
      <GamePlayContainer
        user={props.user}
        fetching={props.fetching}
        selectedGame={props.selectedGame}
        setGameProgress={props.setGameProgress}
        guessResults={props.guessResults}
        updateGuessResults={props.updateGuessResults}
      />
    )
  }

  return (
    <div className={classes.container}>
      <Slide direction={'right'} in={Boolean(props.user.id && props.currentGameId)} mountOnEnter unmountOnExit>
        <div className={classes.gamePanelContainer}>

          <Paper square classes={{root: classes.paper}}>
            <Typography variant="h4" color="inherit" classes={{root: classes.maliFont}}>
              World Geography
            </Typography>
            <Typography variant={'subtitle1'} color={'inherit'} classes={{root: classes.maliFont}}>
              Test your knowledge
            </Typography>
          </Paper>

          {/* TODO Add game search */}

          <Grid container>
            <Grid item xs={12} className={classes.gamePanelGrid}>
              <FormControl fullWidth>
                <InputLabel htmlFor="select-game">Select Game</InputLabel>
                <Select
                  value={props.currentGameId}
                  onChange={props.handleGameSelect}
                  inputProps={{
                    name: 'selectGame',
                    id: 'select-game',
                  }}
                >
                  {props.games.map(game => (
                    <MenuItem key={game.id} value={game.id}>
                      <div className={classes.selectInputItem}>
                        <GameIcon name={game.name}/>
                        <Typography variant={"subtitle1"} className={classes.selectInputItemText}>
                          {game.title}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {gameContent}
            </Grid>
          </Grid>
        </div>
      </Slide>

      <Dialog
        open={props.showModal}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          Select a game to get started
        </DialogTitle>
        <DialogContent>
          <List component={'nav'}>
            {props.games.map(game => (
              <ListItem
                key={game.id}
                button
                onClick={() => props.handleGameSelect(game.id)}
              >
                <GameIcon name={game.name}/>
                <Typography variant={"subtitle1"} className={classes.selectInputItemText}>
                  {game.title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );

};

export default withStyles(styles)(GamePanel);
