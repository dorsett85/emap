import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  gameForm: {
    paddingTop: 15
  }
});


const CitiesPop = props => {
  const { classes } = props;

  // Process the rendering for the result of a guess
  let results = null;
  if (props.guessResults) {
    let li = [];
    for (let k in props.guessResults) {
      if (props.guessResults.hasOwnProperty(k)) {
        li.push(<li key={k}>{k}: {props.guessResults[k]}</li>);
      }
    }
    results = <ul>{li}</ul>;
  }

  const gameProgress = props.selectedGame.progress
    ? `${props.selectedGame.progress.length}/${props.selectedGame.num_answers}`
    : `0/${props.selectedGame.num_answers}`
  ;

  return (
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
      {props.guessMessage && (
        <Typography variant={'subheading'}>
          {props.guessMessage}
        </Typography>
      )}
      {results}
    </div>
  );

};

export default withStyles(styles)(CitiesPop);
