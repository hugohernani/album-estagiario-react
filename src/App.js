import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3333/albums').then( res => this.setState({albums: res.data}) );
  }

  render(){
    return (
      <div className="section">
        <div className="columns">
          <div className="column">
            { this.state.albums.map(album => {
              return (
                <div className="media box">
                  <div className="media-left">{album.id}</div>
                  <div className="media-content">{album.name}</div>
                  <div className="media-right">
                    <button>Detalhes</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
