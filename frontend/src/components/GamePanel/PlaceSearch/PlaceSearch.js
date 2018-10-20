import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {SearchResults} from './SearchResults/SearchResults';
import styles from './PlaceSearch.scss';


export const PlaceSearch = props => (

  <div className={styles.searchContainer}>
    <form onSubmit={props.onSubmit}>
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

    </form>
    <SearchResults searchResults={props.searchResults}/>
  </div>

);
