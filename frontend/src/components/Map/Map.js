import React from 'react';
import L from 'leaflet';
import 'leaflet-css';

import styles from './Map.scss';

export default class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('lMap', {
      center: [51.505, -0.09],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      ]
    });
    this.map.zoomControl.setPosition('topright');
  }

  render() {
    return (
      <div id={'lMap'} className={styles.mapContainer}></div>
    )
  }

}