import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './Map.css';
import MapStyleOptions from './MapStyleOptions.json'

class Map extends Component {
   render() {
     const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 35.907757, lng: 127.766922 } }
          defaultZoom = { 8 }
          defaultOptions = { {styles: MapStyleOptions} }
        >
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
