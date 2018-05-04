import React, {Component} from 'react'
import './SideMenu.css'
import * as FSAPI from './FSAPIs'

class SideMenu extends Component {
  state = {
    findText: ""
  }

  openSideMenu() {
    document.querySelector('#mySidenav').style.width = "250px"
    document.querySelector("#map").style.marginLeft = "250px"
    document.querySelector("#top-bar").style.marginLeft = "250px"
  }

  closeSideMenu() {
    document.querySelector('#mySidenav').style.width = "0"
    document.querySelector("#map").style.marginLeft = "0"
    document.querySelector("#top-bar").style.marginLeft = "0"
  }

  findTextUpdate(event) {
    this.setState({
      findText: event.target.value
    })
  }

  findClicked(center) {
    const lat = center.lat
    const lng = center.lng

    FSAPI.search(this.state.findText).then(function(data) {
      const code = data.meta.code

      if (code === 200) {
        console.log(data.response)
      }
      else {

      }
    })
  }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <input onChange={this.findTextUpdate.bind(this)} type="text"/>
        <button onClick={this.findClicked.bind(this, this.props.center)}>find</button>
      </div>
    )
  }
}

export default SideMenu;
