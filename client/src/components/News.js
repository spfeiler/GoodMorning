import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class News extends Component {

  constructor() {
    super()

    this.state = {
      newsList: [],
      article: []
    }
  }

  componentDidMount() {
    let url = "https://www.reddit.com/r/upliftingnews/new/.json?limit=20"

    fetch(url)
    .then(response => response.json())
    .then(newsItems => {
      let newsList = newsItems.data.children.map((article) => {
        this.setState({
          article: this.state.article.concat(article)
        })
          return ( <div key = {article.data.id}>
            <img src={article.data.thumbnail} />
            <h3>{article.data.title}</h3>
            <a href={article.data.url} target="_blank"><button>View Story</button></a>
            <button onClick={() => this.favNews(article)}>Favorite</button>
          </div>
          )
        })
      this.setState({newsList: newsList})
    })
  }

  viewFavs = () => {
    this.props.history.push('/favorites')
  }

favNews(article) {

  fetch('http://localhost:8080/favorites', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      thumbnail: article.data.thumbnail,
      title: article.data.title,
      url: article.data.url,
      user: this.props.user,
      id: article.data.id
    })
  })
  .then(response => response.json())
  .then(result => {
    if(result.success) {
      console.log('success')
      this.viewFavs()
    } else {
      console.log('error')
    }
  })
}

  render() {
    return(
      <div>
      <h1>News</h1>
      {this.state.newsList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.uid
  }
}

export default connect(mapStateToProps)(withRouter(News))
