/*global google*/

import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import './Map.css'
import SearchBox from './SearchBox'
import VenueSearchBox from './VenueSearchBox'
import MapStyleOptions from './MapStyleOptions.json'

import like from '../images/like.png'
import phone from '../images/phone.png'
import address from '../images/address.png'

class GoogleMapsContainer extends React.Component {
  state = {
    isMounted: false,
    zoom: 14,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedVenue: {},
    venueKeyword: "",
    bounceAnimationIndex: -1
  }

  constructor(props) {
    super(props)
    this.onMapClick = this.onMapClick.bind(this)
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        bounceAnimationIndex: -1
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
      activeMarker: null,
      bounceAnimationIndex: -1
    })

    this.props.onCenterChangeHandler(bounds.getCenter())
    this.refs.venueSearchBox.onCenterChanged(bounds.getCenter())
  }

  onSelectVenue(index, venue) {
    const container = this
    let selectedMarker = this.refs['marker-' + index]

    if (venue.photos && venue.photos.groups && venue.photos.groups[0].items) {
      venue.thumbnail = venue.photos.groups[0].items[0].prefix + "300x100" + venue.photos.groups[0].items[0].suffix
    }
    else {
      venue.thumbnail = "https://dummyimage.com/300x100/ffffff/fff&text=no+image"
    }

    container.setState({
      isMounted: true,
      selectedVenue: venue,
      activeMarker: selectedMarker.marker,
      showingInfoWindow: true,
      bounceAnimationIndex: index
    })
  }

  onVenueUpdateHandler(venueKeyword, venues) {
    const bounds = new google.maps.LatLngBounds();

    for (const venue of venues) {
      bounds.extend(venue.location)
    }

    this.refs.map.map.fitBounds(bounds)
    this.props.onVenueUpdateHandler(venues)

    this.setState({
      venueKeyword: venueKeyword
    })
  }

  componentDidMount() {
    this.props.setOnVenueSelected(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isMounted && !this.state.showingInfoWindow) return false
    if (this.props.radius !== nextProps.radius ||
        this.props.limits !== nextProps.limits ) {
          this.refs.venueSearchBox.setRadius(nextProps.radius)
          this.refs.venueSearchBox.setLimits(nextProps.limits)
          return false
    }

    return true
  }

  render() {
    let container = this
    let {google, center, venues} = this.props
    let {zoom, isMounted, bounceAnimationIndex} = this.state

    return (
      <div id='map'>
        <SearchBox
          onPlacesChanged={this.onPlacesChanged.bind(this)}/>
        <VenueSearchBox
          ref="venueSearchBox"
          center={center}
          onVenueUpdateHandler={this.onVenueUpdateHandler.bind(this)}/>

        <Map
          ref="map"
          google={ google }
          zoom={ zoom }
          initialCenter={ center }
          mapTypeControl={ false }
          styles={ MapStyleOptions }
          onClick={ this.onMapClick }>
          {
            venues.map((venue, index) =>
              <Marker
                ref={"marker-" + index}
                onClick={(props, marker, e) => {
                  if (venue.photos && venue.photos.groups && venue.photos.groups[0].items) {
                    venue.thumbnail = venue.photos.groups[0].items[0].prefix + "300x100" + venue.photos.groups[0].items[0].suffix
                  }
                  else {
                    venue.thumbnail = "https://dummyimage.com/300x100/ffffff/fff&text=no+image"
                  }

                  container.setState({
                    isMounted: true,
                    selectedVenue: venue,
                    activeMarker: marker,
                    showingInfoWindow: true,
                    bounceAnimationIndex: -1
                  })
                }}

                key={ venue.id }
                title={ venue.name }
                position={ {lat: venue.location.lat, lng: venue.location.lng} }
                name={ venue.name }
                animation={ (!isMounted ? google.maps.Animation.DROP : index === bounceAnimationIndex ? google.maps.Animation.BOUNCE : null) }
              />
            )
          }
          <InfoWindow
            marker={ container.state.activeMarker }
            visible={ container.state.bounceAnimationIndex < 0 && container.state.showingInfoWindow }>
            <div className='info-container'>
              <div className='info-head-container'>
                <img
                  className='info-head-img'
                  alt={'venue category image of ' + container.state.selectedVenue.name}
                  src={container.state.selectedVenue.categories &&
                          container.state.selectedVenue.categories[0] &&
                          container.state.selectedVenue.categories[0].icon.prefix + "bg_32" + container.state.selectedVenue.categories[0].icon.suffix}
                  title={container.state.selectedVenue.categories &&
                          container.state.selectedVenue.categories[0] &&
                          container.state.selectedVenue.categories[0].name}
                  />
                <div
                  className='info-head-name'>
                  {container.state.showingInfoWindow && container.state.selectedVenue.name}
                </div>
              </div>
              <hr/>
              <div className='info-body-container'>
                <img
                  className='info-body-thumbnail'
                  alt={'venue image of ' + container.state.selectedVenue.name}
                  src={container.state.selectedVenue.thumbnail}/>
                <hr/>
                <div className='info-body-like'>
                  <img
                    alt={'like image of ' + container.state.selectedVenue.name}
                    src={like} />
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
                  <img
                    alt={'phone image of ' + container.state.selectedVenue.name}
                    src={phone}/>
                  <div className='info-body-phone-number'>
                    {container.state.selectedVenue.contact ?
                      container.state.selectedVenue.contact.formattedPhone ?
                      container.state.selectedVenue.contact.formattedPhone :
                      'Not Yet Registered' : 'Not Yet Registered'}
                  </div>
                </div>
                <div className='info-body-address'>
                  <img
                    alt={'address image of ' + container.state.selectedVenue.name}
                    src={address}/>
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
