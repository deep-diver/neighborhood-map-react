import React, { Component } from 'react';
import './App.css';
import GoogleMapsContainer from './GoogleMapsContainer.js'
import Top from './Top.js'
import SideMenu from './SideMenu.js'

class App extends Component {
  state = {
    center: {
      lat: 37.566535,
      lng: 126.977969
    },

    venues: [],
    selectedVenue: {}
  }

  onVenueUpdated(updatedVenues) {
    this.setState({
      venues: updatedVenues,
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

  render() {
    return (
      <div className="App">
        <Top
          openSideMenuHandler={this.openSideMenu.bind(this)}
          closeSideMenuHandler={this.closeSideMenu.bind(this)}/>
        <SideMenu
          ref={instance => {this.sideMenu = instance}}
          center={this.state.center}
          onVenueUpdated={this.onVenueUpdated.bind(this)}
          onVenueSelected={this.onVenueSelected.bind(this)}/>
        <GoogleMapsContainer
          setOnVenueSelected={onVenueSelected => this.mapContainer = onVenueSelected}
          center={this.state.center}
          venues={this.state.venues}
          onCenterChangeHandler={this.onCenterChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
