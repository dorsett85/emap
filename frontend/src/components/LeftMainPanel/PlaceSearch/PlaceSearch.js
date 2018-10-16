import React from 'react';

import {SearchResults} from './SearchResults/SearchResults';
import styles from './PlaceSearch.scss';


export const PlaceSearch = props => (

  <div className={styles.searchContainer}>
    <form onSubmit={props.onSubmit}>
      <input type={'text'} name={'place'} onInput={props.onInput}/>
      <button type='submit'>Find City</button>
    </form>
    <SearchResults searchResults={props.searchResults}/>
  </div>

);
