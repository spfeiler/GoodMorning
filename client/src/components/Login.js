import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuthenticationHeader } from '../utils/authenticate'
import { withRouter } from 'react-router-dom'

class Login extends Component {

  constructor() {
    super()

    this.state = {
      username: "",
      password: ""
    }
  }

  handleLoginClick = () => {
    axios.post('http://localhost:8080/login', {
      username: this.state.username,
      password: this.state.password
    }).then(response => {

      let token = response.data.token
      let userId = response.data.id
      console.log(token, userId)


      localStorage.setItem('jsonwebtoken', token)

      this.props.onAuthenticated(token, userId)

      setAuthenticationHeader(token)

      this.props.history.push('/home')

    }).catch(error => console.log(error))
  }

  handleTextBoxChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
      <h1>Login</h1>
        <input name="username" onChange={this.handleTextBoxChange} placeholder="Enter Username"></input>
        <input name="password" type="password" onChange={this.handleTextBoxChange} placeholder="Enter Password"></input>
        <button onClick={() => {this.handleLoginClick() }}>Login</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticated: (token, userId) => dispatch({type: 'ON_AUTHENTICATED', token: token, id:userId})
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))
