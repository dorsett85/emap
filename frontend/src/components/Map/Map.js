import React from 'react';
import L from 'leaflet';
import 'leaflet-css';

// stupid hack so that leaflet's images work after going through webpack
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
});

import styles from './Map.scss';


export default class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('lMap', {
      center: [30, -70],
      zoom: 3,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      ]
    });
    this.map.zoomControl.setPosition('topright');
  }

  componentDidUpdate(prevProps, prevState) {

    // Clear the marker when a user logs in/out
    if (prevProps.selectedGame !== this.props.selectedGame) {
      this.map
        .eachLayer(layer => {
          if (layer.marker || layer.shape) {layer.remove();}
        })
    }

    // Update search selections
    if (prevProps.guessResults !== this.props.guessResults) {

      // Check if there are search results
      if (this.props.guessResults) {
        let marker = this.props.guessResults;

        // Clear other markers and fly to new location
        this.map
          .eachLayer(layer => {
            if (layer.marker) {layer.remove();}
          })
          .flyTo([marker.lat, marker.lon]);

        // create new marker with a popup
        let newCity = L.marker([marker.lat, marker.lon]);
        newCity.marker = {city: marker.name};
        newCity
          .addTo(this.map)
          .bindPopup(`<b>${marker.name}</b>`)
          .openPopup();
      }
    }
  }

  render() {
    return <div id={'lMap'} className={styles.mapContainer}></div>
  }

}
