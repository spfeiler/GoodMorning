import React, {Component} from 'react';
import './TopNews.css';
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
            <img className="thumbnail" src={article.data.thumbnail} />
            <div className="articleInfo">
            <h4>{article.data.title}</h4>
            <a href={article.data.url} target="_blank"><button>View Story</button></a>
            <button onClick={() => this.favNews(article)}>Add To Favorites</button>
            </div>
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
      <h2>Today's Top Uplifting News Stories</h2>
      {this.state.newsList}
      <div className="newsLinks">
      <button onClick={this.handleRedirectNews}>View All News Stories</button>
      <button onClick={this.handleRedirectFavs}>View Your Favorite Stories</button>
      </div>
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
