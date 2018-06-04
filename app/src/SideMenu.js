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
    let {radius, limits, center, venues, onVenueUpdated, onVenueSelected, onRadiusChanged, onLimitsChanged} = this.props

    return (
      <div id="mySidenav" className="sidenav">
        <div className="filter">
          <p> Radius (<span>{radius}</span>) </p>
          <input type="range"
                 min="500"
                 max="10000"
                 step="500"
                 className="radius-slider"
                 defaultValue={radius}
                 ref="radius_slider"
                 onChange={onRadiusChanged}/>

          <p> Query Limits (<span>{limits}</span>) </p>
          <input type="range"
                 min="10"
                 max="50"
                 step="5"
                 className="limit-slider"
                 defaultValue={limits}
                 onChange={onLimitsChanged}/>
        </div>
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
