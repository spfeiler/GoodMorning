import React, {Component} from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import TopNews from './TopNews.js'
import DailyEntry from './DailyEntry.js'

class Home extends Component {

  constructor() {
    super()

    this.state = {
      userList: [],
    }
  }

  componentDidMount() {
    let url = 'http://localhost:8080/users'
    fetch(url)
    .then(response => response.json())
    .then(json => {
      let users = json.map((user) => {
        return {id: user.id, first_name: user.first_name}
      })
      this.setState({userList: users})
    })
  }

  render() {
    let userList = this.state.userList.map((user) => {
      if(user.id === this.props.id) {
        return ( <div key = {user.id}>
          <h1>Good Morning {user.first_name}</h1>
        </div>
        )
      }
    })
    return (
      <div className="container">
      <div>
        {userList}
      </div>
      <div>
        <DailyEntry />
      </div>
      <div>
        <TopNews />
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.uid,
  }
}

export default connect(mapStateToProps)(withRouter(Home))
