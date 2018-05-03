import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './Map.css';

class Map extends Component {
   render() {
     const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
          defaultZoom = { 13 }
          defaultOptions = { {styles:
            [
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              }
            ]
          }}
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
