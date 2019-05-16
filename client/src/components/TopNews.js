import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class TopNews extends Component {

  constructor() {
    super()

    this.state = {
      newsList: [],
      article: []
    }
  }

  componentDidMount() {
    let url = "https://www.reddit.com/r/upliftingnews/hot/.json?limit=3"

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

  handleRedirectFavs = () => {

    this.props.history.push('/favorites')
  }

  handleRedirectNews = () => {

    this.props.history.push('/news')
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
        this.handleRedirectFavs()
      } else {
        console.log('error')
      }
    })
  }

  render() {
    return (
      <div>
      <h3>Top News Picks For You</h3>
      {this.state.newsList}
      <button onClick={this.handleRedirectNews}>View All News</button>
      <button onClick={this.handleRedirectFavs}>View Favorites</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.uid
  }
}

export default connect(mapStateToProps)(withRouter(TopNews))
