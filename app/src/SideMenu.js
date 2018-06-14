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

    // const promises = []
    // for (const venue of venues) {
    //   promises.push(FSAPI.getPhotos(venue.id))
    // }
    //
    // Promise.all(promises).then(function(photoDatas) {
    //   for (const photoData of photoDatas) {
    //     const photos = photoData.response.photos
    //
    //     if (photos.count > 0 && photos.items.length > 0) {
    //       const photo = photos.items[0]
    //       const prefix = photo.prefix
    //       const suffix = photo.suffix
    //
    //       const url = prefix + "100x100" + suffix
    //       venue.thumbnail = url
    //     }
    //   }
    // })

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
                className="venue"
                key={venue.id}
                onClick={onVenueSelected.bind(this, index)}>
                <p> {venue.name} </p>
                <img
                  src={
                    (venue.photos && venue.photos.groups && venue.photos.groups[0].items ?
                      venue.photos.groups[0].items[0].prefix + "100x100" + venue.photos.groups[0].items[0].suffix :
                      "https://dummyimage.com/100x100/ffffff/fff&text=no+image")
                  }
                  alt="venue image" />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default SideMenu;
