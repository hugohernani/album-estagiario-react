import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddSong from './AddSong'
import axios from 'axios'

class Album extends Component {
  constructor(){
    super();

    this.state = {
      album: [],
      song: '',
      image: '',
      previewImage: ''
    }
  }

  componentDidMount(){
    const album = this.props.match.params.id;

    axios.get(`http://localhost:3333/albums/${album}`).then(res => this.setState({album: res.data}))
         .catch(err => console.log(err));
  }

  onDeleteSong = id => {
    if(!window.confirm("Realmente deseja excluir?")) return

    axios.delete(`http://localhost:3333/songs/${id}`)
         .then(res => this.setState(prev => ({
           album: {
             ...prev.album,
             songs: [...prev.album.songs.filter(song => song.id !== id)]
           }
         }))).catch(err => console.log(err));
  }

  handleInputChange = ({target}) => {
    if(target.name === 'image'){
      this.setState({[target.name]: target.files[0]})

      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({previewImage: reader.result})
      }

      reader.readAsDataURL(target.files[0]);
    }else{
      this.setState({ [target.name]: target.value })
    }
  }

  onCreateSong = () => {
    const {song, album} = this.state
    if(song === "") return;

    axios.post(`http://localhost:3333/albums/${album.id}/song/add`, {song})
         .then(res => this.setState(prev => ({
           album: {
             ...prev.album,
             songs: [...prev.album.songs, res.data]
           },
           song: ''
         }))).catch(err => console.log(err))
  }

  submitImageAlbum = () => {
    const { album, image } = this.state

    const formData = new FormData()
    formData.append("album_image", image);

    axios.put(`http://localhost:3333/albums/${album.id}/image`, formData)
         .then(res => this.setState({previewImage: res.data.image, image: ''}))
         .catch(res => console.log(res))
  }

  componentWillUnmount(){
    const { image } = this.state;

    console.log(image);

    if(image !== ''){
      if(window.confirm("Deseja salvar as alterações"))
        this.submitImageAlbum()
    }
  }

  render(){
    const { album: {songs, image}, song, previewImage } = this.state

    let loadImage = previewImage ? previewImage : image;

    return (
      <div className="box">
        <h1 className="title">
          Detalhes do Album
          <small>
            <Link to='/albums'>Voltar</Link>
          </small>
        </h1>
        <div className="columns">
          <div className="column">
            <img src={loadImage} className="image" alt=""/>
            <br />
            <div className="field is-gropued">
              <div className="file control">
                <label className="file-label">
                  <input type="file" className="file-input" name="image" onChange={this.handleInputChange} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">Escolher Imagem</span>
                  </span>
                </label>
                <button className="button is-info control" onClick={this.submitImageAlbum}>Atualizar</button>
              </div>
            </div>
          </div>

          <div className="column">
            <AddSong song={song} handleInputChange={this.handleInputChange} onCreateSong={this.onCreateSong} />
            {songs ? songs.map((song, idx) =>
              <p key={song.id}>
                {idx + 1}. {song.name} <span className="icon has-text-danger" onClick={() => this.onDeleteSong(song.id)}><i className="fas fa-trash-alt"></i></span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Album
