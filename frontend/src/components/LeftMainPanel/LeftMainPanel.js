import React from 'react';
import LeftMainPanelSearch from './LeftMainPanelSearch/leftMainPanelSearch';

import styles from './LeftMainPanel.scss';


export default class LeftMainPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.panelContainer}>
        <div className={'body'}>
          <LeftMainPanelSearch/>
        </div>
        <div className={'resizer'}>

        </div>
      </div>
    )
  }
}