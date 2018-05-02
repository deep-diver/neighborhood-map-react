import React, {Component} from 'react';
import './NavButton.css';

class NavButton extends Component {
  toggle() {
    let container = document.querySelector('.container')
    container.classList.toggle("change");
  }

  render() {
    return (
      <div className="container" onClick={this.toggle}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    )
  }
}

export default NavButton;
