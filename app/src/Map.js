/*global google*/
import _ from  'lodash'
import React, { Component } from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
// import { compose, withProps, lifecycle } from 'recompose';
// import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import SearchBox from "react-google-maps/lib/components/places/SearchBox"
import './Map.css'
import MapStyleOptions from './MapStyleOptions.json'

export default class GMap extends Component {
  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 11
  }
  render() {
      return (
        <div className='google-map'>
          <GoogleMapReact
            defaultCenter={ this.props.center }
            defaultZoom={ this.props.zoom }>
          </GoogleMapReact>
        </div>
      )
    }

  // render() {
  //   const GMap = compose(
  //     withProps({
  //       googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAo03uEVYhfB3edmU9qkFJw5BIGLA2mGCc&v=3.exp&libraries=geometry,drawing,places",
  //       loadingElement: <div style={{ height: `100%` }} />,
  //       containerElement: <div className='map-container'/>,
  //       mapElement: <div style={{ height: `100%` }} />,
  //     }),
  //     lifecycle({
  //
  //       souldComponentUpdate(nextProps, nextState) {
  //         return false
  //       },
  //
  //       componentWillMount() {
  //         const refs = {}
  //
  //         this.setState({
  //           center: {
  //             lat: this.props.center.lat, lng: this.props.center.lng
  //           },
  //           places: this.props.places,
  //           onMapMounted: ref => {
  //             refs.map = ref;
  //           },
  //           onSearchBoxMounted: ref => {
  //             refs.searchBox = ref;
  //           },
  //           onPlacesChanged: () => {
  //             const places = refs.searchBox.getPlaces();
  //             const bounds = new google.maps.LatLngBounds();
  //
  //             places.forEach(place => {
  //               if (place.geometry.viewport) {
  //                 bounds.union(place.geometry.viewport)
  //               } else {
  //                 bounds.extend(place.geometry.location)
  //               }
  //             });
  //             const nextMarkers = places.map(place => ({
  //               position: place.geometry.location,
  //             }));
  //             const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
  //
  //             this.setState({
  //               center: nextCenter,
  //             });
  //           }
  //         })
  //       },
  //     }),
  //     withScriptjs,
  //     withGoogleMap
  //   )(props =>
  //     <GoogleMap
  //       ref={props.onMapMounted}
  //       defaultZoom={15}
  //       center={props.center}
  //       defaultDraggable={true}
  //       defaultOptions = {
  //         {
  //           styles: MapStyleOptions,
  //           mapTypeControl: false
  //         }
  //       }
  //     >
  //       <SearchBox
  //         ref={props.onSearchBoxMounted}
  //         controlPosition={google.maps.ControlPosition.TOP_LEFT}
  //         onPlacesChanged={props.onPlacesChanged}
  //       >
  //         <input
  //           className="map-builtin-search-box"
  //           type="text"
  //           placeholder="Customized your placeholder"
  //         />
  //       </SearchBox>
  //       {
  //         props.places.map(place =>
  //           <Marker
  //             key={place.venue.id}
  //             position={ {lat:place.venue.location.lat, lng:place.venue.location.lng} }>
  //           </Marker>
  //         )
  //       }
  //     </GoogleMap>
  //   )
  //
  //   return(
  //     <div id='map'>
  //       <GMap center={this.props.center} places={this.props.places}/>
  //     </div>
  //   )
  // }
}

// export default GMap;

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAo03uEVYhfB3edmU9qkFJw5BIGLA2mGCc'
// })(GMap)
