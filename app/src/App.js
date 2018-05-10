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

    places: [],
    isPlacesUpdated: false,
    selectedVenue: {}
  }

  onPlacesUpdated(updatedPlaces) {
    this.setState({
      places: updatedPlaces,
      isPlacesUpdated: true
    })

    this.setState({
      isPlacesUpdated: false
    })
  }

  onCenterChangeHandler(center) {
    console.log(center)
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      },
      places: []
    })
  }

  onVenueSelected(index) {
    this.setState({
      selectedVenueIndex: index
    })
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
        <Top openSideMenuHandler={this.openSideMenu.bind(this)} closeSideMenuHandler={this.closeSideMenu.bind(this)}/>
        <SideMenu
          ref={instance => {this.sideMenu = instance}}
          center={this.state.center}
          onPlacesUpdated={this.onPlacesUpdated.bind(this)}
          onVenueSelected={this.onVenueSelected.bind(this)}/>
        <GoogleMapsContainer
          center={this.state.center}
          places={this.state.places}
          isPlacesUpdated={this.state.isPlacesUpdated}
          selectedVenueIndex={this.state.selectedVenueIndex}
          onCenterChangeHandler={this.onCenterChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
