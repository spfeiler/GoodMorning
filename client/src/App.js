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
      <div>
        <Login />
        <div>
          <h3>Don't have an account? Click Below to Register.</h3>
          <button onClick={this.handleRedirectRegister}>Register New Account</button>
        </div>
      </div>

    )
  }
}

export default App;
