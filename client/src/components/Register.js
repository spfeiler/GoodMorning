import React, { Component } from 'react';
import About from './About.js';
import './Register.css';
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Register extends Component {

  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }
  }

handleRedirectLogin = () => {

  this.props.history.push('/')
}

handleTextBoxChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleRegisterClick = () => {

  axios.post('http://localhost:8080/register', {

    firstName: this.state.firstName,
    lastName: this.state.lastName,
    username: this.state.username,
    password: this.state.password,


  })
  .then(this.props.history.push('/'))

}

  render() {
    return (
      <div className="container">
        <About />
        <h1>Register New Account</h1>
        <p>First Name: <input name="firstName" onChange={this.handleTextBoxChange} placeholder='Enter First Name'></input></p>
        <p>Last Name: <input name="lastName" onChange={this.handleTextBoxChange} placeholder='Enter Last Name'></input></p>
        <p>Username: <input name="username" onChange={this.handleTextBoxChange} placeholder='Enter Username'></input></p>
        <p>Password: <input name="password" onChange={this.handleTextBoxChange} placeholder='Enter Password'></input></p>
        <button onClick={this.handleRegisterClick}>Register Account</button>
        <h4>Already have an account? Click Below to Sign In.</h4>
        <button onClick={this.handleRedirectLogin}>Account Sign In</button>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticated: (token) => dispatch({type: "ON_AUTHENTICATED", token: token})
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Register))
