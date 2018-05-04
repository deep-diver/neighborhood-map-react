import React, {Component} from 'react'
import './SideMenu.css'
import * as FSAPI from './FSAPIs'

class SideMenu extends Component {
  state = {
    findText: ""
  }

  openSideMenu() {
    document.querySelector('#mySidenav').style.width = "250px"
    document.querySelector("#map").style.marginLeft = "250px"
    document.querySelector("#top-bar").style.marginLeft = "250px"
  }

  closeSideMenu() {
    document.querySelector('#mySidenav').style.width = "0"
    document.querySelector("#map").style.marginLeft = "0"
    document.querySelector("#top-bar").style.marginLeft = "0"
  }

  findTextUpdate(event) {
    this.setState({
      findText: event.target.value
    })
  }

  findClicked(center, onPlacesUpdated) {
    const lat = center.lat
    const lng = center.lng

    FSAPI.search(lat, lng, this.state.findText).then(function(data) {
      const code = data.meta.code

      if (code === 200) {
        // console.log(data.response.groups[0].items)
        onPlacesUpdated(data.response.groups[0].items)
      }
      else {

      }
    })
  }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <input onChange={this.findTextUpdate.bind(this)} type="text"/>
        <button onClick={this.findClicked.bind(this, this.props.center, this.props.onPlacesUpdated)}>find</button>
      </div>
    )
  }
}

export default SideMenu;
