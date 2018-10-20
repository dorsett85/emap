import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

        <AppBar position={'static'}>
          <Toolbar variant={'dense'} className={styles.toolbar}>
            <Typography variant="h6" color="inherit" className={styles.headerFont}>
              World Geography Top 10's
            </Typography>
            <Typography variant={'subtitle1'} color={'inherit'} className={styles.headerFont}>
              Test your knowledge
            </Typography>
          </Toolbar>
        </AppBar>

        <NavigationContainer />

        <Divider/>

        <PlaceSearchContainer
          searchResults={this.props.searchResults}
          updateSearchResults={this.props.updateSearchResults}
        />

      </div>
    )
  }
}
