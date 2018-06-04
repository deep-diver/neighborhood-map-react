/*global google*/

import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import './Map.css'
import SearchBox from './SearchBox'
import VenueSearchBox from './VenueSearchBox'
import MapStyleOptions from './MapStyleOptions.json'
import * as FSAPI from './FSAPIs'

import like from './like.png'
import phone from './phone.png'
import address from './address.png'


class GoogleMapsContainer extends React.Component {
  state = {
    isMounted: false,
    zoom: 14,
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
    })

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
    const container = this
    let selectedMarker = this.refs['marker-' + index]

    FSAPI.getPhotos(venue.id).then(function(photoData) {
      const photos = photoData.response.photos
      if (photos.count > 0 && photos.items.length > 0) {
        const photo = photos.items[0]
        const prefix = photo.prefix
        const suffix = photo.suffix

        const url = prefix + "100x100" + suffix
        venue.thumbnail = url
      }

      container.refs.map.map.setZoom(16)
      container.refs.map.setState({
        currentLocation: selectedMarker.props.position
      })

      container.setState({
        isMounted: true,
        selectedVenue: venue,
        activeMarker: selectedMarker.marker,
        showingInfoWindow: true
      })
    })
  }

  componentDidMount() {
    this.props.setOnVenueSelected(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isMounted && !this.state.showingInfoWindow) return false
    return true
  }

  onVenueUpdateHandler(venues) {
    console.log(venues)

    const bounds = new google.maps.LatLngBounds();

    for (const venue of venues) {
      const lat = venue.location.lat
      const lng = venue.location.lng

      bounds.extend(venue.location)
    }

    this.refs.map.map.fitBounds(bounds)
    this.props.onVenueUpdateHandler(venues)
  }

  render() {
    let container = this
    let {center, venues, onVenueUpdateHandler} = this.props
    let {zoom, isMounted} = this.state

    return (
      <div id='map'>
        <SearchBox onPlacesChanged={this.onPlacesChanged.bind(this)}/>

        <VenueSearchBox
          ref="venueSearchBox"
          center={center}
          onVenueUpdateHandler={this.onVenueUpdateHandler.bind(this)}/>
        <Map
          ref="map"
          google = { this.props.google }
          onClick = { this.onMapClick }
          zoom = { zoom }
          initialCenter = { center }
          mapTypeControl = { false }
          styles = { MapStyleOptions }
        >
        {
          venues.map((venue, index) =>
            <Marker
              ref = {"marker-" + index}
              onClick = {(props, marker, e) => {
                FSAPI.getPhotos(venue.id).then(function(photoData) {
                  if (photoData.meta.code === 200) {
                    const photos = photoData.response.photos
                    if (photos.count > 0 && photos.items.length > 0) {
                      const photo = photos.items[0]
                      const prefix = photo.prefix
                      const suffix = photo.suffix

                      const url = prefix + "300x100" + suffix
                      venue.thumbnail = url
                    }
                  }

                  container.setState({
                    isMounted: true,
                    selectedVenue: venue,
                    activeMarker: marker,
                    showingInfoWindow: true
                  })
                })
              }}
              key = { venue.id }
              title = { venue.name }
              position = { {lat: venue.location.lat, lng: venue.location.lng} }
              name = { venue.name }
              animation = { (!isMounted ? google.maps.Animation.DROP : null) }
            />
          )
        }
          <InfoWindow
            marker = { container.state.activeMarker }
            visible = { container.state.showingInfoWindow }>
            <div className='info-container'>
              <div className='info-head-container'>
                <img
                  className='info-head-img'
                  src={container.state.selectedVenue.categories &&
                          container.state.selectedVenue.categories[0].icon.prefix + "bg_32" + container.state.selectedVenue.categories[0].icon.suffix}
                  title={container.state.selectedVenue.categories &&
                          container.state.selectedVenue.categories[0].name}
                  />
                <div
                  className='info-head-name'>
                  {container.state.showingInfoWindow && container.state.selectedVenue.name}
                </div>
              </div>
              <hr/>
              <div className='info-body-container'>
                <img src={container.state.selectedVenue.thumbnail}/>
                <hr/>
                <div className='info-body-like'>
                  <img src={like} />
                  <div className='info-body-like-label'>
                    { container.state.selectedVenue.likes && container.state.selectedVenue.likes.count > 0 ? container.state.selectedVenue.likes.summary : 'Not Yet Registered' }
                  </div>
                </div>
                { container.state.selectedVenue.hours && container.state.selectedVenue.hours.timeframes.length > 0 &&
                  <div>
                    <hr/>
                    <div className='info-body-timeframe'>
                      <b>Open Times</b>
                      <ul>
                        {
                          container.state.selectedVenue.hours.timeframes.map((timeframe, index) =>
                             <li key={index}> <span className="bold-text">{timeframe.days} :</span>
                                              {timeframe.open.map((time, index2) => {
                                                if (timeframe.open.length-1 === index2) return time.renderedTime;
                                                else return time.renderedTime + "|"
                                              })}
                             </li>
                          )
                        }
                      </ul>
                    </div>
                  </div>
                }
                <hr/>
                <div className='info-body-phone'>
                  <img src={phone}/>
                  <div className='info-body-phone-number'>
                    {container.state.selectedVenue.contact ?
                      container.state.selectedVenue.contact.formattedPhone ?
                      container.state.selectedVenue.contact.formattedPhone :
                      'Not Yet Registered' : 'Not Yet Registered'}
                  </div>
                </div>
                <div className='info-body-address'>
                  <img src={address}/>
                  <div className='info-body-address-number'>
                    {container.state.selectedVenue.location ?
                      container.state.selectedVenue.location.city ?
                      container.state.selectedVenue.location.city + ", " + container.state.selectedVenue.location.address :
                      'Not Yet Registered' : 'Not Yet Registered'}
                  </div>
                </div>
              </div>
            </div>
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
