import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js'

class App extends Component {

  handleRedirectRegister = () => {

    this.props.history.push('/register')
  }

  render() {
    return (
      <div className="container">
        <Login />
        <div>
          <h4>Don't have an account? Click Below to Register.</h4>
          <button onClick={this.handleRedirectRegister}>Register New Account</button>
        </div>
      </div>

    )
  }
}

export default App;
