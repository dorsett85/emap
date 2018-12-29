import React from 'react';
import mapboxgl from 'mapbox-gl';

import ajax from '../../assets/utils/ajaxRequests';
import styles from './Map.scss';


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: []
    };
  }

  componentDidMount() {

    // Get the Mapbox token
    ajax.getMapToken(token => {
      mapboxgl.accessToken = token.map_token;
      this.map = new mapboxgl.Map({
        container: 'lMap',
        style: 'mapbox://styles/mapbox/satellite-streets-v10',
        center: [0, 20],
        zoom: 1.75
      });

      this.map.on('load', () => {
        this.addGameProgress(this.state.layers)
      });

    });

  }

  resetMap() {
    // Remove old layers
    if (this.state.layers.length) {
      this.state.layers.forEach(layer => layer.remove());
    }

    // Repopulate layers if a selected game has progress
    const layers = [];
    if (this.props.selectedGame.id && this.props.selectedGame.progress.length) {
      this.props.selectedGame.progress.forEach(layer => {
        layers.push(Map.newLayer(layer));
      });
      this.addGameProgress(layers);
    }

    // Reset the layer state
    this.setState({
      layers: layers
    })

  }

  addGameProgress(layers) {
    if (layers.length && this.map.loaded()) {
      layers.forEach(layer => {
        layer.addTo(this.map);
      })
    }
  }

  static newLayer(layer, answer = true) {
    let newLayer;

    // Create map layer depending on type
    if (layer.map_type === 'marker') {
      const options = answer ? {} : {color: '#d61d1d'};
      newLayer = new mapboxgl.Marker(options)
        .setLngLat([layer.lon, layer.lat])
        .setPopup(Map.popupInfo(layer, ['country', 'population', 'rank']));

    } else {

      //TODO add other map type layers

    }

    // Add an id, map type, and answer property for later reference
    newLayer.id = layer.id;
    newLayer[layer.map_type] = true;
    newLayer.answer = answer;

    return newLayer;

  }

  static popupInfo(layer, info) {

    // Add info to an array of <li> elements
    const popupInfo = [];
    for (const k in layer) {
      if (layer.hasOwnProperty(k) && info.includes(k)) {
        popupInfo.push(`<li>${k}: ${layer[k]}</li>`);
      }
    }
    return new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <b>${layer.name}</b>
        <ul>${popupInfo.join('')}</ul>
      `);
  }

  popupToggle(layer) {
    // Close other popups before opening the current one
    this.state.layers.forEach(l => {
      if (l._popup.isOpen()) {l.togglePopup();}
    });
    if (!layer._popup.isOpen()) {layer.togglePopup();}
  }

  componentDidUpdate(prevProps, prevState) {

    // Reset layers on user change or game change
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {
      this.resetMap();
    }

    // Check guess results and update
    if (Object.keys(this.props.guessResults.data).length) {
      if (prevProps.guessResults.data.id !== this.props.guessResults.data.id) {

        // Remove old non answer layers
        const nonAnswerLayers = this.state.layers.filter(layer => !layer.answer);
        if (nonAnswerLayers.length) {nonAnswerLayers.forEach(layer => layer.remove());}

        // Get data from existing layer if it exists, and remove old non answer layers
        const layerData = this.props.guessResults.data;
        let currentLayer = this.state.layers.filter(v => v.id === layerData.id)[0];

        // Check for existing marker
        if (!currentLayer) {

          // Check if the new guess is an answer to differentiate color
          const isAnswer = this.props.guessResults.hasOwnProperty('new');
          currentLayer = Map.newLayer(layerData, isAnswer).addTo(this.map);

        }

        // Open only the current layers popup and fly to it's location
        this.popupToggle(currentLayer);
        this.map.flyTo({
          center: currentLayer.getLngLat()
        });

        // Set the layer state so it only includes answers and the current layer
        const answerLayers = this.state.layers.filter(layer => layer.answer);
        this.setState({
          layers: [...answerLayers, currentLayer]
        })

      }
    }
  }

  render() {
    return <div id={'lMap'} className={styles.mapContainer}></div>;
  }

}
