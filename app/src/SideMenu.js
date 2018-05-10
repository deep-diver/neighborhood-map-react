import React, {Component} from 'react'
import './SideMenu.css'
import * as FSAPI from './FSAPIs'

class SideMenu extends Component {
  state = {
    findText: "",
    places: []
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
    const ref = this

    FSAPI.search(lat, lng, this.state.findText).then(function(data) {
      const code = data.meta.code

      if (code === 200) {
        // console.log(data.response.groups[0].items)
        const places = data.response.groups[0].items
        places.forEach((item) => {
          item.isInfoOpen = false
        })

        onPlacesUpdated(places)

        ref.setState({
          places: data.response.groups[0].items
        })
      }
      else {

      }
    })
  }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <div>
          <input onChange={this.findTextUpdate.bind(this)} type="text"/>
          <button onClick={this.findClicked.bind(this, this.props.center, this.props.onPlacesUpdated)}>find</button>
        </div>
        <div className="place-list">
          {
            this.state.places.map((place,index) =>
              <div
                key={place.venue.id}
                onClick={this.props.onVenueSelected.bind(this, index)}>
                {place.venue.name}
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default SideMenu;
