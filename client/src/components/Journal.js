import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Journal extends Component {

  constructor() {
    super()

    this.state = {
      entryList: []
    }
  }

  componentDidMount() {
    let url = 'http://localhost:8080/entry'
    fetch(url)
    .then(response => response.json())
    .then(json => {
      let entries = json.map((entry) => {
        return {id: entry.id, user: entry.user, date: entry.date, entry_one: entry.entry_one, entry_two: entry.entry_two, entry_three: entry.entry_three}
      })
      this.setState({entryList: entries})
    })
  }

  handleRedirectEntry = () => {

    this.props.history.push('/addentry')
  }

  render() {
    let entryList = this.state.entryList.map((entry) => {
      if(entry.user === this.props.user) {
        return ( <div key = {entry.id}>
          <h3>Entry Date: {entry.date}</h3>
          <h4>Today I am grateful for...</h4>
          <p>1. {entry.entry_one}</p>
          <p>2. {entry.entry_two}</p>
          <p>3. {entry.entry_three}</p>
          <button onClick={() => this.deleteEntry(entry)}>Delete</button>
        </div>
        )
      }
    })
    return (
      <div>
        <h3>Add a new entry?</h3>
        <button onClick={this.handleRedirectEntry}>Add New Entry</button>
        <h1>Journal</h1>
        {entryList}
      </div>
    )
  }

  deleteEntry(entry) {
    let deleteId = {
      entryKey: entry.id
    }
    fetch('http://localhost:8080/delete', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(deleteId)
    })
    .then(response => response.json())
    .then(result => {
      if(result.success) {
        console.log('success')
      } else {
        console.log('error')
      }
    })
    console.log(this.state.entryList)
    this.setState({entryList: this.state.entryList.filter(entry => {
      return entry.id != deleteId.entryKey
    })
  })
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.uid
  }
}

export default connect(mapStateToProps)(withRouter(Journal))
