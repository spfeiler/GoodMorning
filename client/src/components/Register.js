import React, { Component } from 'react';
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
      <div>
        <h1>Register New Account</h1>
        <input name="firstName" onChange={this.handleTextBoxChange} placeholder='Enter First Name'></input>
        <input name="lastName" onChange={this.handleTextBoxChange} placeholder='Enter Last Name'></input>
        <input name="username" onChange={this.handleTextBoxChange} placeholder='Enter Username'></input>
        <input name="password" onChange={this.handleTextBoxChange} placeholder='Enter Password'></input>
        <button onClick={this.handleRegisterClick}>Register</button>
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
