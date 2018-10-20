import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {SearchResults} from './SearchResults/SearchResults';
import styles from './PlaceSearch.scss';


export const PlaceSearch = props => (

  <div className={styles.searchContainer}>
    <form onSubmit={props.onSubmit}>
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

);
