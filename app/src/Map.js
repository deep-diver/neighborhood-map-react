/*global google*/

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import './Map.css';
import MapStyleOptions from './MapStyleOptions.json';

class Map extends Component {
  searchBox = null
  map = null

  onPlacesChanged(onCenterChangeHandler) {
    const places = this.searchBox.getPlaces()
    const bounds = new google.maps.LatLngBounds()

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })

    this.map.fitBounds(bounds)
    this.map.center = bounds.getCenter()
    let center = this.map.getCenter()
    onCenterChangeHandler(center)
  }

  onSearchBoxMounted(ref) {
    this.searchBox = ref
  }

  onMapMounted(ref) {
    this.map = ref
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapMounted}
        defaultCenter = { { lat: props.center.lat, lng: props.center.lng } }
        defaultZoom = { 12 }
        defaultOptions = {
          {
            styles: MapStyleOptions,
            mapTypeControl: false
          }
        }
        onBoundsChanged = { props.onBoundsChanged }
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}>
          <input
            className="map-builtin-search-box"
            type="text"
            placeholder="Customized your placeholder"
          />
        </SearchBox>
      </GoogleMap>
    ))

    return(
      <div id='map'>
        <GoogleMapExample
          containerElement={
            <div className='map-container'/>
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.props.center}
          onMapMounted={this.onMapMounted.bind(this)}
          onPlacesChanged={this.onPlacesChanged.bind(this, this.props.onCenterChangeHandler)}
          onSearchBoxMounted={this.onSearchBoxMounted.bind(this)}
        />
      </div>
    )
  }
}

export default Map;
