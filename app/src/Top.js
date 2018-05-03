import React, { Component } from 'react';
import NavButton from './NavButton.js'
import "./Top.css"

class Top extends Component {
  render() {
    return (
      <div id="top-bar">
        <NavButton openSideMenuHandler={this.props.openSideMenuHandler} closeSideMenuHandler={this.props.closeSideMenuHandler}/>
      </div>
    )
  }
}

export default Top;
