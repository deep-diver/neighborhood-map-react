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

  render() {
    let {center, venues, onVenueUpdated, onVenueSelected} = this.props

    return (
      <div id="mySidenav" className="sidenav">
        <div className="place-list">
          {
            venues.map((venue,index) =>
              <div
                key={venue.id}
                onClick={onVenueSelected.bind(this, index)}>
                {venue.name}
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default SideMenu;
