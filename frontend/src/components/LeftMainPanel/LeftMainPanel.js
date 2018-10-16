import React from 'react';

import PlaceSearchContainer from './PlaceSearch/PlaceSearchContainer';
import styles from './LeftMainPanel.scss';


export default class LeftMainPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.panelContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <h1>World Cities 100</h1>
            <span>Search for a BIG city</span>
          </div>
          <PlaceSearchContainer
            searchResults={this.props.searchResults}
            updateSearchResults={this.props.updateSearchResults}
          />
        </div>
      </div>
    )
  }
}