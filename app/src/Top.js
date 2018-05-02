import React, { Component } from 'react';
import NavButton from './NavButton.js'
import "./Top.css"

class Top extends Component {
  render() {
    return (
      <div className="top-bar">
        <NavButton/>
      </div>
    )
  }
}

export default Top;
