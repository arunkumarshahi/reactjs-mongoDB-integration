import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PersonForm from './PersonForm'

class App extends Component {
  render() {
    return (
      <div className="App">
       <PersonForm/>
      </div>
    );
  }
}

export default App;
