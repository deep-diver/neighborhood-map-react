/*global google*/

import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import './Map.css'
import SearchBox from './SearchBox'
import MapStyleOptions from './MapStyleOptions.json'


class GoogleMapsContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedVenue: {},
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

  onSelectVenue(index, venue) {
    let selectedMarker = this.refs['marker-' + index]

    this.setState({
      selectedVenue: venue,
      activeMarker: selectedMarker.marker,
      showingInfoWindow: true
    })
  }

  componentDidMount() {
    this.props.setOnVenueSelected(this)
  }

  render() {
    let container = this
    let updatedVenues = this.props.venues

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
          updatedVenues.map((venue, index) =>
            <Marker
              ref = {"marker-" + index}
              onClick = {(props, marker, e) => {
                container.setState({
                  selectedVenue: venue,
                  activeMarker: marker,
                  showingInfoWindow: true
                })
              }}
              key = { venue.venue.id }
              title = { venue.venue.name }
              position = { {lat: venue.venue.location.lat, lng: venue.venue.location.lng} }
              name = { venue.venue.name }
            />
          )
        }
          <InfoWindow
            marker = { container.state.activeMarker }
            visible = { container.state.showingInfoWindow }>
            <div className='info-div'>{container.state.showingInfoWindow && container.state.selectedVenue.venue.name}</div>
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
