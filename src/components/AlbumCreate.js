import React from 'react'

const AlbumCreate = ({album, artist, handleInputChange, handleSubmit}) => {
  return (<div className="box">
    <h1 className="title">Adicionar Novo Album</h1>
    <div className="field">
      <div className="control">
        <input type="text" className="input" placeholder="Nome do Album" name="album" value={album} onChange={handleInputChange} />
      </div>
    </div>

    <div className="field">
      <div className="control">
        <input type="text" className="input" placeholder="Nome do Artista" name="artist" value={artist} onChange={handleInputChange} />
      </div>
    </div>

    <div className="field">
      <button className="button" onClick={handleSubmit}>Adicionar</button>
    </div>
  </div>
  )
}

export default AlbumCreate
