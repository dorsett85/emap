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
    this.state = {
      answerLayers: [],
      lastNonAnswerLayer: {}
    };
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

    // Remove all of the marker and shape layers and reset the answer layers to empty
    this.map.eachLayer(layer => {
      if (layer.marker || layer.shape) {
        layer.remove();
      }
    });
    this.setState({
      answerLayers: []
    });

  }

  addGameProgress() {
    if (this.props.selectedGame.progress.length) {

      // Instantiate array of markers
      const answerLayers = [];
      this.props.selectedGame.progress.forEach((v, i, a) => {
        if (v.map_type === 'marker') {

          let layer = L.marker([v.lat, v.lon]);
          layer.marker = true;
          layer.id = v.id;
          layer
            .addTo(this.map)
            .bindPopup(Map.popupInfo(v, ['country', 'population']));

          // Fly to the last marker
          if (i === a.length - 1) {
            this.map.flyTo([v.lat, v.lon]);
            layer.openPopup();
          }

          // Add to list of markers
          answerLayers.push(layer);

        }
      });

      // Update the markers state
      this.setState({
        answerLayers: answerLayers
      });
    }
  }

  addLayer(layer) {
    let newLayer;

    // Create and add layer based on its map type
    if (layer.map_type === 'marker') {
      newLayer = L.marker([layer.lat, layer.lon]);
      newLayer.marker = true;
      newLayer.id = layer.id;

      newLayer
        .addTo(this.map)
        .bindPopup(Map.popupInfo(layer, ['country', 'population']))
        .openPopup();
      this.map.flyTo([layer.lat, layer.lon]);
    }

    return newLayer;

  }

  static popupInfo(layer, info) {
    const popupInfo = [];
    for (const k in layer) {
      if (layer.hasOwnProperty(k) && info.includes(k)) {
        popupInfo.push(`<li>${k}: ${layer[k]}</li>`);
      }
    }
    return `
      <b>${layer.name}</b>
      <ul>${popupInfo.join('')}</ul>
    `;
  }

  removeLastNonAnswerLayer() {
    if (Object.keys(this.state.lastNonAnswerLayer).length) {
      this.map.removeLayer(this.state.lastNonAnswerLayer);
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

        let layer = this.props.guessResults.data;
        const existingAnswerLayer = this.state.answerLayers.filter(v => v.id === layer.id)[0];

        // Check for existing marker
        if (existingAnswerLayer) {

          existingAnswerLayer.openPopup();
          this.map.flyTo([
            existingAnswerLayer._latlng.lat,
            existingAnswerLayer._latlng.lng
          ]);

        } else if (this.props.guessResults.new) {

          // create new marker with a popup
          const newLayer = this.addLayer(layer);

          // Remove last non answer layer from the map if it exists and Add the new one to the
          // existing markers
          this.removeLastNonAnswerLayer();
          this.setState({
            answerLayers: [...this.state.answerLayers, newLayer],
            lastNonAnswerLayer: {}
          });

        } else {

          // This is now not an answer for the game, but add it
          let newLayer = this.addLayer(layer);

          // Remove last non answer layer from the map if it exists and set the new one
          this.removeLastNonAnswerLayer();
          this.setState({
            lastNonAnswerLayer: newLayer
          });

        }

      }
    }
  }

  render() {
    return <div id={'lMap'} className={styles.mapContainer}></div>;
  }

}
