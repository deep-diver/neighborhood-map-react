import React, {Component} from 'react'
import * as FSAPI from '../API/FSAPIs'
import './SearchBox.css'

export default class VenueSearchBox extends Component {
  state = {
    center: {},
    radius: 1000,
    limits: 10
  }

  componentDidMount() {
    this.setState({
      center: this.props.center,
    })
  }

  onCenterChanged(center) {
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      }
    })

    this.refs.venueInput.value = ""
  }

  setRadius(radius) {
    this.setState({
      radius: radius
    })
  }

  setLimits(limits) {
    this.setState({
      limits: limits
    })
  }

  keyPressed(e) {
    const ref = this
    const venueKeyword = e.target.value
    const keyCode = e.which || e.keyCode

    if (keyCode === 13) {
      const lat = this.state.center.lat
      const lng = this.state.center.lng
      const radius = this.state.radius
      const limits = this.state.limits

      console.log(radius)

      FSAPI.search(lat, lng, radius, limits, venueKeyword).then(function(data) {
        const code = data.meta.code

        if (code === 200) {
          const venues = data.response.venues

          let tmpVenues = []
          const promises = []
          for (const venue of venues) {
            promises.push(FSAPI.getDetail(venue.id))
          }

          Promise.all(promises).then(function(detailOnAllVenues) {
            for (const details of detailOnAllVenues) {
              if (details.meta.code === 200) {
                tmpVenues.push(details.response.venue)
              }
            }

            ref.props.onVenueUpdateHandler(venueKeyword, tmpVenues)
          })
        }
      })
    }
  }

  render() {
    return <label className="venue-search-label"> FIND VENUES <input
              ref="venueInput"
              className="venue-search-box"
              type="text"
              placeholder="Search for Venues"
              onKeyPress={this.keyPressed.bind(this)}
            /> </label>
  }
}
