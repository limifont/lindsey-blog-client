import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import Navbar from './components/Navbar.js';
import './App.css';
import Routes from './Routes';
import { Nav, NavItem } from "react-bootstrap";

import { authUser } from "./libs/awsLib";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Navbar />
        <Routes childProps={childProps} />
      </div>
    )
  }
}

export default App;