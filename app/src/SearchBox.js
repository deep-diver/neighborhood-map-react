/*global google*/

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './SearchBox.css'

export default class SearchBox extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  }
  render() {
    return <input className="search-box" ref="input" type="text"/>
  }
  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces())
    }
  }
  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input)
    this.searchBox = new google.maps.places.SearchBox(input)
    this.searchBox.addListener('places_changed', this.onPlacesChanged)
  }
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged)
  }
}