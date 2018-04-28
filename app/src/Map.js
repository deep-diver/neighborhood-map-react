import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './Map.css';

class Map extends Component {
   render() {
     const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
          defaultZoom = { 13 }
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
