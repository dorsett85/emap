import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

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
  const {classes} = props;

  return (
    <div className={classes.gameDiv}>
      <Typography variant={'h6'} align={'center'} classes={{root: classes.maliFont}}>
        {props.selectedGame}
      </Typography>
      <form className={classes.gameForm} onSubmit={props.onSubmit}>
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
      <SearchResults searchResults={props.searchResults}/>
    </div>
  )

};

export default withStyles(styles)(GamePlay);