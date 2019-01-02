import React from 'react';
import Slide from "@material-ui/core/Slide";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CityIcon from "@material-ui/icons/LocationCity";
import {withStyles} from '@material-ui/core/styles';

// Custom components
import GamePlayContainer from './GamePlay/GamePlayContainer';

const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    width: 350,
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: 'white',
    boxShadow: theme.shadows[15],
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
  },
  gameExpansionPanelsDiv: {
    paddingTop: 10
  },
  expandedGameTitle: {
    fontWeight: 'bold'
  },
  expandedPanel: {
    paddingLeft: 0,
    paddingRight: 0
  }
});


const GamePanel = props => {
  const {classes} = props;

  return (
    <Slide direction={'right'} in={Boolean(props.user.id)} mountOnEnter unmountOnExit>
      <div className={classes.panelContainer}>

        <Paper square classes={{root: classes.paper}}>
          <Typography variant="h4" color="inherit" classes={{root: classes.maliFont}}>
            World Geography
          </Typography>
          <Typography variant={'subtitle1'} color={'inherit'} classes={{root: classes.maliFont}}>
            Test your knowledge
          </Typography>
        </Paper>

        {/* TODO Add game search */}

        <div className={classes.gameExpansionPanelsDiv}>
          {props.games.map(game => {
            return (
              <ExpansionPanel
                key={game.id}
                expanded={props.selectedGame.id === game.id}
                onChange={props.handleGameClick(game.id)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <CityIcon/>&nbsp;&nbsp;
                  <Typography
                    className={props.selectedGame.id === game.id ? classes.expandedGameTitle : ''}
                    variant={'subtitle1'}
                  >
                    {game.title}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expandedPanel}>
                  {props.selectedGame.id === game.id && (
                    <GamePlayContainer
                      user={props.user}
                      selectedGame={props.selectedGame}
                      setGameProgress={props.setGameProgress}
                      guessResults={props.guessResults}
                      updateGuessResults={props.updateGuessResults}
                    />
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })}
        </div>

      </div>
    </Slide>
  );

};

export default withStyles(styles)(GamePanel);
