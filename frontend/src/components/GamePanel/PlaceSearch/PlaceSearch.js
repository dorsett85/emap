import React from 'react';

import {SearchResults} from './SearchResults/SearchResults';
import styles from './PlaceSearch.scss';


export const PlaceSearch = props => (

  <div className={styles.searchContainer}>
    <form onSubmit={props.onSubmit}>
      <div className={'field'}>
        <label className={'label'}>Enter a BIG City</label>
        <div className={'control'}>
          <input className={'input'} type={'text'} name={'place'} onInput={props.onInput} placeholder="Type a city"/>
        </div>
      </div>
      <div className={'field'}>
        <div className={'control'}>
          <button className={'button is-link'} type='submit'>Find City</button>
        </div>
      </div>
    </form>
    <SearchResults searchResults={props.searchResults}/>
  </div>

);
