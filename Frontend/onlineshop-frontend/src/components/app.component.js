import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from './cardlist.component';
import HeaderAppBar from './header.component';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderAppBar></HeaderAppBar>
      </div>
    );
  }
}

export default App;