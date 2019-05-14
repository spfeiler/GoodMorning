import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class AddEntry extends Component {

  constructor() {
    super()

    this.state = {
      date: '',
      entry: ''
    }
  }

  viewJournal = () => {
    this.props.history.push('/journal')
  }

  handleTextBoxChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSaveClick = () => {

    fetch('http://localhost:8080/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          date: this.state.date,
          entry: this.state.entry,
          user: this.props.user
        })
    })

    .then(response => response.json())
    .then(result => {
      if(result.success) {
        console.log('success')
        this.viewJournal()
      } else {
        console.log('error')
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Add Journal Entry</h1>
        <input name="date" onChange={this.handleTextBoxChange} placeholder="Enter Today's Date"></input>
        <input name="entry" type="textbox" onChange={this.handleTextBoxChange} placeholder="Ex: 'Today I am gratiful for ...'"></input>
        <button onClick={this.handleSaveClick}>Save Entry</button>
      </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.uid
    }
  }


export default connect(mapStateToProps)(withRouter(AddEntry))
