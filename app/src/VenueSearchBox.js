/*global google*/

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as FSAPI from './FSAPIs'
import './SearchBox.css'

export default class VenueSearchBox extends Component {
  state = {
    center: {}
  }

  componentDidMount() {
    this.setState({
      center: this.props.center
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

  keyPressed(e) {
    const ref = this
    const venueKeyword = e.target.value
    const keyCode = e.which || e.keyCode

    if (keyCode === 13) {
      const lat = this.state.center.lat
      const lng = this.state.center.lng

      FSAPI.search(lat, lng, venueKeyword).then(function(data) {
        const code = data.meta.code

        if (code === 200) {
          const venues = data.response.groups[0].items
          ref.props.onVenueUpdateHandler(venues)
        }
      })
    }
  }

  render() {
    return <input
              ref="venueInput"
              className="venue-search-box"
              type="text"
              placeholder="Search for Venues"
              onKeyPress={this.keyPressed.bind(this)}
            />
  }
}
