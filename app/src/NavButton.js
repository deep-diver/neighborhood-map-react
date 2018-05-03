import React, {Component} from 'react';
import './NavButton.css';

class NavButton extends Component {
  state = {
    sideOpen: false
  }

  toggle(openSideMenuHandler, closeSideMenuHandler) {
    let container = document.querySelector('.container')
    container.classList.toggle("change")

    if (this.state.sideOpen) closeSideMenuHandler()
    else openSideMenuHandler()

    this.setState({
      sideOpen: !this.state.sideOpen
    })
  }

  render() {
    return (
      <div className="container" onClick={(e) => this.toggle(this.props.openSideMenuHandler, this.props.closeSideMenuHandler, e)}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    )
  }
}

export default NavButton;
