import React from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    margin: '15px 15px 10px 15px',
  },
  formControl: {
    width: '100%'
  }
});


const GameSelector = props => {
  const {classes} = props;

  return (
    <div className={classes.container}>
      <FormControl variant={'outlined'} className={classes.formControl}>
        <InputLabel htmlFor="selectGame">Select Game</InputLabel>
        <Select
          value={props.selectedGame}
          onChange={props.onChange}
          input={
            <OutlinedInput labelWidth={90}/>
          }
          inputProps={{
            name: 'selectedGame',
            id: 'selectGame',
          }}
        >
          <MenuItem value={10}>Cities - Top 10 Population</MenuItem>
          <MenuItem value={20}>Cities - Top 10 Education</MenuItem>
          <MenuItem value={30}>Cities - Top 10 Income</MenuItem>
        </Select>
      </FormControl>
    </div>

  );

};

export default withStyles(styles)(GameSelector)