import React, {Component} from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Favorites extends Component {

  constructor() {
    super()

    this.state = {
      favList: []
    }
  }

  componentDidMount() {
    let url = 'http://localhost:8080/favorites'
    fetch(url)
    .then(response => response.json())
    .then(json => {
      let favs = json.map((fav) => {
        console.log(json)
        return {id: fav.id, user: fav.user, thumbnail: fav.thumbnail, title: fav.title, url: fav.url}
      })
      this.setState({favList: favs})
    })
  }

  render() {
    let favList = this.state.favList.map((fav) => {
      if(fav.user === this.props.user) {
        return ( <div key = {fav.id}>
          <img src={fav.thumbnail} className="thumbnail" />
          <div className="articleInfo">
          <h3>{fav.title}</h3>
          <a href={fav.url} target="_blank"><button>View Story</button></a>
          <button onClick={() => this.deleteFav(fav)}>Delete</button>
          </div>
        </div>
        )
      }
    })
    return (
      <div className="container">
        <h1>Your Favorite Stories</h1>
        {favList}
      </div>
    )
  }

  deleteFav(fav) {
    let deleteFavId = {
      favKey: fav.id
    }
    fetch('http://localhost:8080/deletefav', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(deleteFavId)
    })
    .then(response => response.json())
    .then(result => {
      if(result.success) {
        console.log('success')
      } else {
        console.log('error')
      }
    })
    console.log(this.state.favList)
    this.setState({favList: this.state.favList.filter(fav => {
      return fav.id != deleteFavId.favKey
    })
  })
  }
}

  const mapStateToProps = (state) => {
    return {
      user: state.uid
    }
  }

export default connect(mapStateToProps)(withRouter(Favorites))
