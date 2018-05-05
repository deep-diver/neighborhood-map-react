import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Top from './Top.js'
import SideMenu from './SideMenu.js'

class App extends Component {
  state = {
    center: {
      lat: 37.566535,
      lng: 126.977969
    },

    places: [],
    isPlacesUpdated: false
  }

  onPlacesUpdated(updatedPlaces) {
    this.setState({
      places: updatedPlaces,
      isPlacesUpdated: true
    })
    console.log(this.state.isPlacesUpdated)

    this.setState({
      isPlacesUpdated: false
    })

    console.log(this.state.isPlacesUpdated)
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
        <SideMenu ref={instance => {this.sideMenu = instance}} center={this.state.center} onPlacesUpdated={this.onPlacesUpdated.bind(this)}/>
        <Map center={this.state.center} isPlacesUpdated={this.state.isPlacesUpdated} places={this.state.places} onCenterChangeHandler={this.onCenterChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
