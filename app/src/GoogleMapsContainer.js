/*global google*/

import _ from  'lodash'
import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import './Map.css'
import ReactDOM from 'react-dom'
import SearchBox from './SearchBox'
import MapStyleOptions from './MapStyleOptions.json'


class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onPlacesChanged(places) {
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });

    this.refs.map.setState({
      currentLocation: bounds.getCenter()
    })
  }

  render() {
    return (
      <div id='map'>
        <SearchBox onPlacesChanged={this.onPlacesChanged.bind(this)}/>
        <Map
          ref="map"
          google = { this.props.google }
          onClick = { this.onMapClick }
          zoom = { 14 }
          initialCenter = {{ lat: 39.648209, lng: -75.711185 }}
          mapTypeControl = { false }
          styles = { MapStyleOptions }
        >
          <Marker
            onClick = { this.onMarkerClick }
            title = { 'Changing Colors Garage' }
            position = {{ lat: 39.648209, lng: -75.711185 }}
            name = { 'Changing Colors Garage' }
          />
          <InfoWindow
            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }
          >
            <div>
              hello world!
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}
export default GoogleApiWrapper({
    api: 'AIzaSyAo03uEVYhfB3edmU9qkFJw5BIGLA2mGCc',
    libraries: ['geometry', 'drawing', 'places']
})(GoogleMapsContainer)
