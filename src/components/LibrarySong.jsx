import React from 'react'

const LibrarySong = ({ songs, song, setCurrentSong, audioRef, isPlaying, setSongs }) => {
  const songSelectHandle = async () => {
    await setCurrentSong(song)
    if (isPlaying) audioRef.current.play()

    const newSongs = songs.map(item => {
      if (item.id === song.id) {
        return {
          ...item,
          active: true
        }
      } else {
        return {
          ...item,
          active: false
        }
      }
    })

    setSongs(newSongs)
  }

  return (
    <div onClick={songSelectHandle} className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong