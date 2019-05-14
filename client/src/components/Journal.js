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
      let entryList = json.map((entry) => {
        if(entry.user === this.props.user) {
          return ( <div key = {entry.id}>
            <h3>{entry.date}</h3>
            <p>{entry.entry}</p>
            <button onClick={() => this.deleteEntry(entry)}>Delete</button>
          </div>
          )
        }
      })
      this.setState({entryList: entryList})
    })
  }

  handleRedirectEntry = () => {

    this.props.history.push('/addentry')
  }

  render() {
    return (
      <div>
        <h3>Add a new entry?</h3>
        <button onClick={this.handleRedirectEntry}>Add New Entry</button>
        <h1>Journal</h1>
        {this.state.entryList}
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
    this.setState({entryList: this.props.entryList})
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.uid
  }
}

export default connect(mapStateToProps)(withRouter(Journal))
