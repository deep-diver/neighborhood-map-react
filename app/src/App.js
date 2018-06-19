import React, { Component } from 'react';
import './App.css';
import GoogleMapsContainer from './Map/GoogleMapsContainer.js'
import Top from './Top/Top.js'
import SideMenu from './Side/SideMenu.js'

document.addEventListener("DOMContentLoaded", function(e) {
  let scriptTag = document.getElementsByTagName('SCRIPT').item(1)

  scriptTag.onerror = function(e) {
    alert('Ops! We cant access Google Maps API for now! Try after checking your internet connection!')
  }
})

class App extends Component {
  state = {
    center: {
      lat: 37.566535,
      lng: 126.977969
    },

    radius: 1000,
    limits: 10,
    categories: [],

    venues: [],
    selectedVenue: {}
  }

  onVenueUpdated(updatedVenues) {
    this.setState({
      venues: updatedVenues,
    })
  }

  onVenueUpdateHandler(venues) {
     this.setState({
      venues: venues
    })
  }

  onCenterChangeHandler(center) {
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      },
      venues: []
    })
  }

  onVenueSelected(index) {
    this.setState({
      selectedVenueIndex: index
    })

    this.mapContainer.onSelectVenue(index, this.state.venues[index])
  }

  openSideMenu() {
    this.sideMenu.openSideMenu()
  }

  closeSideMenu() {
    this.sideMenu.closeSideMenu()
  }

  onRadiusChanged(e) {
    this.setState({
      radius: e.target.value
    })
  }

  onLimitsChanged(e) {
    this.setState({
      limits: e.target.value
    })
  }

  render() {
    return (
      <div
        role="main"
        className="App">
        <Top
          openSideMenuHandler={this.openSideMenu.bind(this)}
          closeSideMenuHandler={this.closeSideMenu.bind(this)}/>
        <SideMenu
          ref={instance => {this.sideMenu = instance}}
          center={this.state.center}
          venues={this.state.venues}
          radius={this.state.radius}
          limits={this.state.limits}
          onVenueUpdated={this.onVenueUpdated.bind(this)}
          onVenueSelected={this.onVenueSelected.bind(this)}
          onRadiusChanged={this.onRadiusChanged.bind(this)}
          onLimitsChanged={this.onLimitsChanged.bind(this)}/>
        <GoogleMapsContainer
          setOnVenueSelected={onVenueSelected => this.mapContainer = onVenueSelected}
          center={this.state.center}
          venues={this.state.venues}
          radius={this.state.radius}
          limits={this.state.limits}
          onCenterChangeHandler={this.onCenterChangeHandler.bind(this)}
          onVenueUpdateHandler={this.onVenueUpdateHandler.bind(this)}/>
      </div>
    )
  }
}

export default App;
