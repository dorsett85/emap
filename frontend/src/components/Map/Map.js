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
        this.resetMap();
      });

    });

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

      newLayer.id = layer.id;

    } else if (layer.map_type === 'geojson_polygon') {

      newLayer = {
        id: layer.iso_a3,
        type: 'fill',
        source: {
          type: 'geojson',
          data: layer.geojson
        },
        layout: {},
        paint: {
          'fill-color': answer ? styles.answerColor : styles.nonAnswerColor,
          'fill-opacity': 0.8
        },
        lonLat: [layer.lon, layer.lat]
      }

    }

    // Add a map type and answer property for later reference
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
      if (l._popup.isOpen()) {
        l.togglePopup();
      }
    });
    if (!layer._popup.isOpen()) {
      layer.togglePopup();
    }
  }

  static removeLayer(layer) {
    if (layer.marker) {
      layer.remove();
    } else if (layer.geojson_polygon) {
      this.map.removeLayer(layer.id);
      this.map.removeSource(layer.id);
    }
  }

  addLayer(layer) {

    // Add layer based on type
    if (layer.marker) {

      layer.addTo(this.map);

    } else if (layer.geojson_polygon) {

      // Make sure the geojson layer is below the map label
      const layers = this.map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          this.map.addLayer(layer, layers[i].id);
          break;
        }
      }


    }

  }

  resetMap() {

    // Remove old layers
    this.state.layers.forEach(Map.removeLayer.bind(this));

    // Repopulate layers if a selected game has progress
    const layers = [];
    if (this.props.selectedGame.id) {
      this.props.selectedGame.progress.forEach(layer => {
        const newLayer = Map.newLayer(layer);
        this.addLayer(newLayer);
        layers.push(newLayer);
      });
    }

    // Reset the layer state
    this.setState({
      layers: layers
    })

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Reset layers on user change or game change
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {
      this.resetMap();
    }

    // Check guess results and update
    if (this.props.guessResults.data) {
      const prevGuessId = !prevProps.guessResults.data ? null : prevProps.guessResults.data.id;
      if (prevGuessId !== this.props.guessResults.data.id) {

        // Get data from existing layer if it exists, and remove old non answer layers
        const layerData = this.props.guessResults.data;
        let currentLayer = this.state.layers.filter(v => {
          return v.id === (layerData.map_type === 'marker' ? layerData.id : layerData.iso_a3)
        })[0];

        // Check for existing marker
        if (!currentLayer) {

          // Check if the new guess is an answer to differentiate color
          const isAnswer = this.props.guessResults.hasOwnProperty('new');
          currentLayer = Map.newLayer(layerData, isAnswer);
          this.addLayer(currentLayer, false);

          // Update the layer state with the currentLayer
          this.setState({
            layers: [...this.state.layers, currentLayer]
          })

        }

        // Toggle popup and fly to the guessed location
        if (currentLayer.marker) {this.popupToggle(currentLayer);}
        const lonLat = currentLayer.marker ? currentLayer.getLngLat() : currentLayer.lonLat;
        this.map.flyTo({
          center: lonLat
        });

      }
    }
  }

  render() {
    return <div id={styles.map} className={styles.mapContainer}></div>;
  }

}
