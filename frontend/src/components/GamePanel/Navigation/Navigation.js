import React from 'react';

import styles from './Navigation.scss';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import Button from "@material-ui/core/Button/Button";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";

export const Navigation = props => (
  <FormGroup row className={styles.selectForm}>
    <FormControl variant={'outlined'} className={styles.selectGame}>
      <InputLabel>Select Game</InputLabel>
      <Select
        native
        value={''}
        input={
          <OutlinedInput labelWidth={90}/>
        }
      />
    </FormControl>
    <Button variant={'outlined'}>
      Login
    </Button>
  </FormGroup>
);