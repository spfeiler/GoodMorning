import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Menu extends Component {

  handleLogoutClick = () => {

    console.log(this.props.isAuthenticated)

    // remove jsonwebtoken from local storage
    localStorage.removeItem('jsonwebtoken')

    // update global state isAuthenticated = false
    this.props.logout()

    // redirect the user to login screen
    this.props.history.push('/')

    console.log("handleLogoutClick")
  }

  render() {
    return (
      <ul>
      {!this.props.isAuthenticated ?   <li><NavLink to = '/'>Signin</NavLink></li> : null }
      {this.props.isAuthenticated ?   <li><NavLink to = '/home'>Home</NavLink></li> : null }
      {this.props.isAuthenticated ?   <li><NavLink to = '/news'>News</NavLink></li> : null }
      {this.props.isAuthenticated ?   <li><NavLink to = '/journal'>Journal</NavLink></li> : null }
      <li><NavLink to = '/donate'>Donate</NavLink></li>
      {this.props.isAuthenticated ?   <li><a onClick={this.handleLogoutClick} href="#">Logout</a></li> : null }
      </ul>
    )
  }

}

class BaseLayout extends Component {

  render() {
    return (
      <div>
        <Menu isAuthenticated={this.props.isAuthenticated} logout={this.props.onLogout} history={this.props.history} />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({type: 'LOGOUT'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BaseLayout))
