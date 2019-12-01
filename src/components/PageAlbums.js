import React, { Component } from 'react'
import axios from 'axios'
import Albums from './Albums'
import AlbumCreate from './AlbumCreate'

export default class PageAlbums extends Component {
  constructor(){
    super();

    this.state = {
      albums: [],
      album: "",
      artist: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3333/albums').then( res => this.setState({albums: res.data}) );
  }

  handleInputChange = ({target}) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = () => {
    const { album, artist } = this.state;
    if(album === '' || artist === '') return;

    axios.post("http://localhost:3333/albums/", {
      album, artist
    }).then(res => this.setState((prev) => (
      {
        albums: [res.data, ...prev.albums],
        artist: "",
        album: ""
      }
    ))).catch(err => console.log(err))
  }

  onDeleteAlbum = (id) => {
    if(!window.confirm("Realmente deseja excluir?")) return;

    axios.delete(`http://localhost:3333/albums/${id}`)
      .then(res => this.setState({
      albums: this.state.albums.filter(album => album.id !== id)
    })).catch(res => console.log(res))

  }

  render(){
    const { albums, artist, album } = this.state;
    return (
      <div className="container">
        <AlbumCreate artist={artist} album={album} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
        <div className="columns">
          <div className="column">
            <Albums albums={albums} onDeleteAlbum={this.onDeleteAlbum}/>
          </div>
        </div>
      </div>
    )
  }
}
