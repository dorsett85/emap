import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// Custom components
import SearchResults from './SearchResults/SearchResults';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  gameDiv: {
    padding: 10
  },
  gameForm: {
    paddingTop: 15
  }
});


const GamePlay = props => {
  const { classes } = props;

  const gameProgress = props.selectedGame.progress
    ? `${props.selectedGame.progress.length}/${props.selectedGame.num_answers}`
    : `0/${props.selectedGame.num_answers}`
  ;

  // Game specific rendering
  const game = props.selectedGame.name === 'cityPopTop10'
    ? (
      <div>
        <form className={classes.gameForm} onSubmit={props.onSubmit}>
          <Typography variant={'subheading'} align={'center'} classes={{ root: classes.maliFont }}>
            Progress: {gameProgress}
          </Typography>
          <br/>
          <FormGroup>
            <TextField
              variant={'outlined'}
              label={'Search for a BIG city'}
              onInput={props.onInput}
              placeholder={'Type a city'}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant={'contained'}
              type={'submit'}>
              Find City
            </Button>
          </FormGroup>
        </form>
        <SearchResults guessResults={props.guessResults}/>
      </div>
    )
    : (
      <Typography variant={'subheading'} align={'center'} classes={{ root: classes.maliFont }}>
        Under construction
      </Typography>
    );

  return (
    <div className={classes.gameDiv}>
      <Typography variant={'h6'} align={'center'} classes={{ root: classes.maliFont }}>
        {props.selectedGame.title}
      </Typography>
      {game}
    </div>
  );

};

export default withStyles(styles)(GamePlay);
