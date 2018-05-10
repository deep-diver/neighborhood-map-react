/*global google*/

import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import './Map.css'
import SearchBox from './SearchBox'
import MapStyleOptions from './MapStyleOptions.json'


class GoogleMapsContainer extends React.Component {
  state = {
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedVenue: {},
    selectedVenueIndex: {}
  }

  constructor(props) {
    super(props)
    this.onMapClick = this.onMapClick.bind(this)
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

    this.props.onCenterChangeHandler(bounds.getCenter())
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.refs.map)
  }

  render() {
    let container = this
    let updatedPlaces = this.props.places
    let selectedVenueIndex = this.props.selectedVenueIndex

    console.log(selectedVenueIndex)

    return (
      <div id='map'>
        <SearchBox onPlacesChanged={this.onPlacesChanged.bind(this)}/>
        <Map
          ref="map"
          google = { this.props.google }
          onClick = { this.onMapClick }
          zoom = { 14 }
          initialCenter = { this.props.center }
          mapTypeControl = { false }
          styles = { MapStyleOptions }
        >
        {
          updatedPlaces.map((place, index) => {
              let marker =
                  <Marker
                    ref = {index}
                    onClick = {(props, marker, e) => {
                      console.log(place)

                      container.setState({
                        selectedVenue: place,
                        selectedVenueIndex: index,
                        selectedPlace: props,
                        activeMarker: marker,
                        showingInfoWindow: true
                      });
                    }}
                    key = { place.venue.id }
                    title = { place.venue.name }
                    position = { {lat: place.venue.location.lat, lng: place.venue.location.lng} }
                    name = { place.venue.name }
                  />
                return marker
              }
            )
        }
          <InfoWindow
            marker = { container.state.activeMarker }
            visible = { container.state.showingInfoWindow }
          >
            <div className='info-div'>{this.state.showingInfoWindow && this.state.selectedVenue.venue.name}</div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAo03uEVYhfB3edmU9qkFJw5BIGLA2mGCc',
    libraries: ['geometry', 'drawing', 'places']
})(GoogleMapsContainer)
