import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Top from './Top.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Top/>
        <Map/>
      </div>
    );
  }
}

export default App;
