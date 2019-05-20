import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class DailyEntry extends Component {
  constructor() {
    super()

    let today = new Date()
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()

    this.state = {
      date: date,
      entryList: []

    }
  }

  componentDidMount() {
    let url = 'http://localhost:8080/entry'
    fetch(url)
    .then(response => response.json())
    .then(json => {
      let entries = json.map((entry) => {
        return {id: entry.id, user: entry.user, date: entry.date}
      })
      this.setState({entryList: entries})
    })
  }

  handleRedirectEntry = () => {

    this.props.history.push('/addentry')
  }

  render() {
    let journalToday = false
    let message = (
      <div>
        <h3>You Have Not Completed Your Daily Gratitude Practice</h3>
        <p> Don't forget to contribute to your journal today! <button onClick={this.handleRedirectEntry}>Add Journal Entry</button></p>
      </div>)

    this.state.entryList.forEach((entry) => {
        if (entry.user === this.props.user) {
          if (entry.date === this.state.date) {
            message = (
              <div>
                <h3>You Have Completed Your Daily Gratitude Practice</h3>
                <p>Would you like to add another journal entry? <button onClick={this.handleRedirectEntry}>Add Journal Entry</button></p>
              </div>
            )
          }
        }
      })


    return (
      <div>
        {message}
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      user: state.uid
    }
  }

export default connect(mapStateToProps)(withRouter(DailyEntry))
