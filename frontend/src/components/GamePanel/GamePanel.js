import React from 'react';

import PlaceSearchContainer from './PlaceSearch/PlaceSearchContainer';
import styles from './GamePanel.scss';


export default class GamePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.panelContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <h1 className={'title'}>World Cities 100</h1>
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