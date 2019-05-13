import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Register extends Component {

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      name: ''
    }
  }

handleTextBoxChange = (e) => {

  this.setState({
    [e.target.name]: e.target.value
  })
}

handleRegisterClick = () => {

  axios.post('http://localhost:8080/register', {
    username: this.state.username,
    password: this.state.password,
    name: this.state.name


  }).then(response => {
    this.props.history.push('/')
  })
}

  render() {
    return (
      <div>
        <h1>Register New Account</h1>
        <input name="username" onChange={this.handleTextBoxChange} placeholder='Register Username'></input>
        <input name="password" onChange={this.handleTextBoxChange} placeholder='Register Password'></input>
        <input name="name" onChange={this.handleTextBoxChange} placeholder='Register Name'></input>
        <button onClick={this.handleRegisterClick}>Register</button>
      </div>

    )
  }
}

export default (withRouter(Register))
