/*global google*/

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import './Map.css';
import MapStyleOptions from './MapStyleOptions.json';

class Map extends Component {
  searchBox = null
  map = null

  onPlacesChanged() {
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
    console.log(places)
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
        defaultCenter = { { lat: 35.907757, lng: 127.766922 } }
        defaultZoom = { 8 }
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
          onMapMounted={this.onMapMounted.bind(this)}
          onPlacesChanged={this.onPlacesChanged.bind(this)}
          onSearchBoxMounted={this.onSearchBoxMounted.bind(this)}
        />
      </div>
    )
  }
}

export default Map;
