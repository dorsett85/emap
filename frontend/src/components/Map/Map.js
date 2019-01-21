import React from 'react';
import mapboxgl from 'mapbox-gl';

import ajax from 'assets/utils/ajaxRequests';
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
        container: styles.map,
        style: 'mapbox://styles/mapbox/satellite-streets-v10',
        center: [-30, 15],
        zoom: 1.6
      });

      this.map.on('load', () => {
        this.addGameProgress(this.state.layers);
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

      // Set up marker and popup options
      const markerOptions = {
        color: answer ? styles.answerColor : styles.nonAnswerColor
      };
      const popupOptions = {
        answer: answer,
        info: ['country', 'population', 'rank']
      };

      // Create layer
      newLayer = new mapboxgl.Marker(markerOptions)
        .setLngLat([layer.lon, layer.lat])
        .setPopup(Map.popupInfo(layer, popupOptions));

    } else if (layer.map_type === 'geojson_polygon') {

      //TODO add other map type layers
            // Set up marker and popup options
      const markerOptions = {
        color: answer ? styles.answerColor : styles.nonAnswerColor
      };
      const popupOptions = {
        answer: answer,
        info: ['population', 'area', 'rank']
      };

      // Create layer
      newLayer = new mapboxgl.Marker(markerOptions)
        .setLngLat([layer.lon, layer.lat])
        .setPopup(Map.popupInfo(layer, popupOptions));
    }

    // Add an id, map type, and answer property for later reference
    newLayer.id = layer.id;
    newLayer[layer.map_type] = true;
    newLayer.answer = answer;

    return newLayer;

  }

  static popupInfo(layer, options) {

    // Add info to an array of <p> elements
    const popupInfo = [];
    for (const k in layer) {
      if (layer.hasOwnProperty(k) && options.info.includes(k)) {
        popupInfo.push(`<p>${k}: ${layer[k]}</p>`);
      }
    }

    // Create html content
    const html = `
      <div class="${styles.popupTitle}">
        <span>${layer.name}</span>
      </div>
      <div class="${styles.popupContent}">
        ${popupInfo.join('')}
      </div>
    `;

    // Return new popup
    return new mapboxgl.Popup({
      offset: 36,
      closeButton: false,
      className: options.answer ? styles.mapPopupAnswer : styles.mapPopupNonAnswer
    }).setHTML(html);
  }

  popupToggle(layer) {
    // Close other popups before opening the current one
    this.state.layers.forEach(l => {
      if (l._popup.isOpen()) {l.togglePopup();}
    });
    if (!layer._popup.isOpen()) {layer.togglePopup();}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Reset layers on user change or game change
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {
      this.resetMap();
    }

    // Check guess results and update
    if (Object.keys(this.props.guessResults.data).length) {
      if (prevProps.guessResults.data.id !== this.props.guessResults.data.id) {

        // Get data from existing layer if it exists, and remove old non answer layers
        const layerData = this.props.guessResults.data;
        let currentLayer = this.state.layers.filter(v => v.id === layerData.id)[0];

        // Check for existing marker
        if (!currentLayer) {

          // Check if the new guess is an answer to differentiate color
          const isAnswer = this.props.guessResults.hasOwnProperty('new');
          currentLayer = Map.newLayer(layerData, isAnswer).addTo(this.map);
          // if (layerData.geojson) {
          //   console.log(layerData);
          //   this.map.addLayer({
          //     id: String(layerData.id),
          //     type: 'fill',
          //     source: {
          //       type: 'geojson',
          //       data: layerData.geojson
          //     },
          //     layout: {},
          //     paint: {
          //       'fill-color': '#088',
          //       'fill-opacity': 0.8
          //     }
          //   })
          // }

          // Update the layer state with the currentLayer
          this.setState({
            layers: [...this.state.layers, currentLayer]
          })

        }

        // Open only the current layers popup and fly to it's location
        this.popupToggle(currentLayer);
        this.map.flyTo({
          center: currentLayer.getLngLat()
        });

      }
    }
  }

  render() {
    return <div id={styles.map} className={styles.mapContainer}></div>;
  }

}
