import React, {Component} from 'react'
import TimerMixin from 'react-timer-mixin'
import './SideMenu.css'

import like from '../images/like.png'
import phone from '../images/phone.png'
import address from '../images/address.png'

class SideMenu extends Component {
  timeout = null

  state = {
    findText: "",
    venues: []
  }

  openSideMenu() {
    if (document.body.clientWidth > 768) {
      document.querySelector('#mySidenav').style.width = "400px"
      document.querySelector("#top-bar").style.marginLeft = "400px"
      document.querySelector("#map").style.marginLeft = "400px"

      this.timeout = TimerMixin.setTimeout(() => {
        document.querySelector("#map").style.width = "calc(100% - 400px)"

        TimerMixin.clearTimeout(this.timeout)
      }, 350);
    }
    else {
      document.querySelector('#mySidenav').style.width = "100%"
    }
  }

  closeSideMenu() {
    document.querySelector('#mySidenav').style.width = "0"

    if (document.body.clientWidth > 768) {
      document.querySelector("#top-bar").style.marginLeft = "0"
      document.querySelector("#map").style.marginLeft = "0"
      document.querySelector("#map").style.width = "100%"
    }
  }

  render() {
    let {radius, limits, venues, onVenueSelected, onRadiusChanged, onLimitsChanged} = this.props

    let noImage = "https://dummyimage.com/100x100/ffffff/fff&text=no+image"

    return (
      <div id="mySidenav" className="sidenav">
        <div className="filter">
          <p className="filter-title"> Query Filter </p>
          <p> Radius in (<span>{radius}</span>) meters </p>
          <input type="range"
                 min="1000"
                 max="10000"
                 step="500"
                 className="radius-slider"
                 defaultValue={radius}
                 ref="radius_slider"
                 onChange={onRadiusChanged}
                 aria-valuemax="10000"
                 aria-valuemin="1000"
                 aria-valuenow="1000"/>

          <p> Query Limits (<span>{limits}</span>) </p>
          <input type="range"
                 min="10"
                 max="50"
                 step="5"
                 className="limit-slider"
                 defaultValue={limits}
                 onChange={onLimitsChanged}
                 aria-valuemax="50"
                 aria-valuemin="10"
                 aria-valuenow="5"/>
        </div>
        <div className="place-list">
          {
            venues.map((venue,index) =>
              <div
                tabIndex="0"
                className="venue"
                key={venue.id}
                onClick={onVenueSelected.bind(this, index)}>
                <p className="venue-title"> {venue.name} </p>
                <img
                  src={
                    (venue.photos ? venue.photos.groups ? venue.photos.groups[0] ? venue.photos.groups[0].items ?
                      venue.photos.groups[0].items[0].prefix + "100x100" + venue.photos.groups[0].items[0].suffix :
                      noImage : noImage : noImage : noImage )
                  }
                  alt={"image of " + venue.name} />
                <div className="venue-info">
                  <div>
                    <img
                      src={like}
                      alt={"like image of " + venue.name}/>
                    <span className="venue-info-value">
                    { venue.likes ? venue.likes.count > 0 ?
                      venue.likes.summary :
                      'Not Yet Registered' : 'Not Yet Registered' }
                    </span>
                  </div>
                  <div>
                    <img
                      src={phone}
                      alt={"phone image of " + venue.name}/>
                    <span className="venue-info-value">
                    {venue.contact ? venue.contact.formattedPhone ?
                      venue.contact.formattedPhone :
                      'Not Yet Registered' : 'Not Yet Registered'}
                    </span>
                  </div>
                  <div>
                    <img
                      src={address}
                      alt={"address image of " + venue.name}/>
                    <span className="venue-info-value">
                      {venue.location ? venue.location.city ?
                        venue.location.city + ", " + venue.location.address :
                        'Not Yet Registered' : 'Not Yet Registered'}
                    </span>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default SideMenu;
