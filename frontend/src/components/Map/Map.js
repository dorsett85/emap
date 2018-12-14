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
  constructor(props) {
    super(props);
    this.setState({
      markers: []
    });
  }

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

  clearMap() {
    this.map.eachLayer(layer => {
      if (layer.marker || layer.shape) {
        layer.remove();
      }
    });
    this.setState({
      markers: []
    });
  }

  addGameProgress() {
    if (this.props.selectedGame.progress.length) {

      // Instantiate array of markers
      const markers = [];
      this.props.selectedGame.progress.forEach((v, i, a) => {
        if (v.map_type === 'marker') {

          let marker = L.marker([v.lat, v.lon]);
          marker.marker = true;
          marker.id = v.id;
          marker
            .addTo(this.map)
            .bindPopup(`<b>${v.name}</b>`);

          // Fly to the last marker
          if (i === a.length - 1) {
            this.map.flyTo([v.lat, v.lon]);
            marker.openPopup();
          }

          // Add to list of markers
          markers.push(marker);

        }
      });

      // Update the markers state
      this.setState({
        markers: markers
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    // Clear the markers on user change or game change
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {

      this.clearMap();

      // Add the game progress if there's a selected game
      if (this.props.selectedGame.id) {
        this.addGameProgress();
      }
    }

    // Check guess results and update
    if (Object.keys(this.props.guessResults.data).length) {
      if (prevProps.guessResults.data.id !== this.props.guessResults.data.id) {

        let marker = this.props.guessResults.data;
        const existingMarker = this.state.markers.filter(v => v.id === marker.id)[0];

        // Check for existing marker
        if (existingMarker) {

          existingMarker.openPopup();
          this.map.flyTo([existingMarker._latlng.lat, existingMarker._latlng.lng]);

        } else if (this.props.guessResults.new) {

          // create new marker with a popup
          let newMarker = L.marker([marker.lat, marker.lon]);
          newMarker.marker = true;
          newMarker.id = marker.id;
          newMarker
            .addTo(this.map)
            .bindPopup(`<b>${marker.name}</b>`)
            .openPopup();

          // Add it to the existing markers
          const existingMarkers = this.state.markers;
          existingMarkers.push(marker);
          this.setState({
            markers: existingMarkers
          });

          this.map.flyTo([marker.lat, marker.lon]);

        } else {

          // This is now not an answer for the game, so add it, but remove any previous marker
          // guesses that aren't answers
          const existingMarkerIds = this.state.markers.map(v => v._leaflet_id);
          this.map.eachLayer(layer => {

            if (layer.marker && !existingMarkerIds.includes(layer._leaflet_id)) {
              layer.remove();
            }

          });

          let newMarker = L.marker([marker.lat, marker.lon]);
          newMarker.marker = true;
          newMarker.id = marker.id;
          newMarker
            .addTo(this.map)
            .bindPopup(`<b>${marker.name}</b>`)
            .openPopup();
          this.map.flyTo([marker.lat, marker.lon])

        }

      }
    }
  }

  render() {
    return <div id={'lMap'} className={styles.mapContainer}></div>;
  }

}
