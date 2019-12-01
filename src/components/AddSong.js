import React from 'react'

const AddSong = ({song, handleInputChange, onCreateSong}) => {
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input type="text" className="input" value={song} onChange={handleInputChange} name="song" />
      </div>
      <div className="control">
        <button className="button is-success" onClick={onCreateSong}><i className="fas fa-plus"></i></button>
      </div>
    </div>
  )
}

export default AddSong
