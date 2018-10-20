import React from 'react';

import NavigationContainer from './Navigation/NavigationContainer';
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
          <div className={styles.header + ' has-text-centered'}>
            <h3 className={'title is-3'}>World Geography</h3>
            <h5 className={'subtitle'}>Test your knowledge</h5>
          </div>
          <NavigationContainer />
          <PlaceSearchContainer
            searchResults={this.props.searchResults}
            updateSearchResults={this.props.updateSearchResults}
          />
        </div>
      </div>
    )
  }
}