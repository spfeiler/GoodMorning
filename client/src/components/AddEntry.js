import React, {Component} from 'react';
import './AddEntry.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class AddEntry extends Component {

  constructor() {
    super()

    let today = new Date()
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()

    this.state = {
      date: date,
      entry_one: '',
      entry_two: '',
      entry_three: ''
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
          entry_one: this.state.entry_one,
          entry_two: this.state.entry_two,
          entry_three: this.state.entry_three,
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
      <div className="container">
        <h1>New Journal Entry</h1>
        <h3>Entry Guidelines</h3>
        <ul>
        <li>Try to submit three things you are thankful for per day</li>
        <li>Make your gratitude statements short and concise</li>
        <li>Do not repeat your entries</li>
        <li>If you experience "gratitude block", try using categories to generate ideas<br />Example categories: relationships, opportunities, experiences, objects, etc</li>
        </ul>
        <h3>Entry Date: {this.state.date}</h3>
        <h4>Today I am grateful...</h4>
        <h4>1. <input name="entry_one" type="text" onChange={this.handleTextBoxChange} className="input" placeholder="for my wonderful friends and family."></input></h4>
        <h4>2. <input name="entry_two" type="text" onChange={this.handleTextBoxChange} className="input" placeholder="for the opportunity to become a web developer."></input></h4>
        <h4>3. <input name="entry_three" type="text" onChange={this.handleTextBoxChange} className="input" placeholder="that the sun is shining."></input></h4>
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
