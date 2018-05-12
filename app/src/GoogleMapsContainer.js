/*global google*/

import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import TimerMixin from 'react-timer-mixin'
import './Map.css'
import SearchBox from './SearchBox'
import VenueSearchBox from './VenueSearchBox'
import MapStyleOptions from './MapStyleOptions.json'


class GoogleMapsContainer extends React.Component {
  state = {
    isMounted: false,
    zoom: 14,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedVenue: {},
    venues: []
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
      })
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
    this.refs.map.map.setZoom(14)

    this.setState({
      isMounted: false,
      selectedVenue: {},
      showingInfoWindow: false,
      activeMarker: null
    })

    this.props.onCenterChangeHandler(bounds.getCenter())
    this.refs.venueSearchBox.onCenterChanged(bounds.getCenter())
  }

  onSelectVenue(index, venue) {
    let container = this
    let selectedMarker = this.refs['marker-' + index]

    this.setState({
      isMounted: true,
      selectedVenue: venue,
      activeMarker: selectedMarker.marker,
      showingInfoWindow: true
    })

    this.refs.map.map.setZoom(16)
    this.refs.map.setState({
      currentLocation: selectedMarker.props.position
    })
    console.log(this.refs.map)
  }

  toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  componentDidMount() {
    this.props.setOnVenueSelected(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isMounted && !this.state.showingInfoWindow) return false
    return true
  }

  onVenueUpdateHandler(venues) {
    this.setState({
      venues: venues
    })
  }

  render() {
    let container = this

    return (
      <div id='map'>
        <SearchBox onPlacesChanged={this.onPlacesChanged.bind(this)}/>

        <VenueSearchBox
          ref="venueSearchBox"
          center={this.props.center}
          onVenueUpdateHandler={this.onVenueUpdateHandler.bind(this)}/>

        <Map
          ref="map"
          google = { this.props.google }
          onClick = { this.onMapClick }
          zoom = { this.state.zoom }
          initialCenter = { this.props.center }
          mapTypeControl = { false }
          styles = { MapStyleOptions }
        >
        {
          this.state.venues.map((venue, index) =>
            <Marker
              ref = {"marker-" + index}
              onClick = {(props, marker, e) => {
                container.setState({
                  isMounted: true,
                  selectedVenue: venue,
                  activeMarker: marker,
                  showingInfoWindow: true
                })
              }}
              key = { venue.venue.id }
              title = { venue.venue.name }
              position = { {lat: venue.venue.location.lat, lng: venue.venue.location.lng} }
              name = { venue.venue.name }
              animation = { (!this.state.isMounted ? google.maps.Animation.DROP : null) }
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
