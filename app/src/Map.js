/*global google*/

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import './Map.css';
import MapStyleOptions from './MapStyleOptions.json';

class Map extends Component {
   render() {
     const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 35.907757, lng: 127.766922 } }
          defaultZoom = { 8 }
          defaultOptions = { {styles: MapStyleOptions} }
        >
          <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}>
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
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
          />
        </div>
     )
   }
}

export default Map;
