import React, {Component} from 'react'
import TimerMixin from 'react-timer-mixin'
import './SideMenu.css'
import * as FSAPI from './FSAPIs'

class SideMenu extends Component {
  timeout = null

  state = {
    findText: "",
    venues: []
  }

  openSideMenu() {
    document.querySelector('#mySidenav').style.width = "350px"
    document.querySelector("#top-bar").style.marginLeft = "350px"
    document.querySelector("#map").style.marginLeft = "350px"

    this.timeout = TimerMixin.setTimeout(() => {
      document.querySelector("#map").style.width = "calc(100% - 350px)"

      TimerMixin.clearTimeout(this.timeout)
    }, 350);
  }

  closeSideMenu() {
    document.querySelector('#mySidenav').style.width = "0"
    document.querySelector("#top-bar").style.marginLeft = "0"
    document.querySelector("#map").style.marginLeft = "0"
    document.querySelector("#map").style.width = "100%"
  }

  clearVenue() {
    this.setState({
      venues: []
    })
  }

  findTextUpdate(event) {
    this.setState({
      findText: event.target.value
    })
  }

  findClicked(center, onVenueUpdated) {
    const lat = center.lat
    const lng = center.lng
    const ref = this

    FSAPI.search(lat, lng, this.state.findText).then(function(data) {
      const code = data.meta.code

      if (code === 200) {
        // console.log(data.response.groups[0].items)
        const venues = data.response.groups[0].items

        onVenueUpdated(venues)

        ref.setState({
          venues: venues
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
          <p className="venue-search-label">find interest of your place</p>
          <input className="venue-search-input" onChange={this.findTextUpdate.bind(this)} type="text"/>
          <button className="venue-search-button" onClick={this.findClicked.bind(this, this.props.center, this.props.onVenueUpdated)}>find</button>
        </div>
        <div className="place-list">
          {
            this.state.venues.map((place,index) =>
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
