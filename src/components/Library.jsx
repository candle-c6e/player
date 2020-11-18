import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, isShowLibrary }) => {
  return (
    <div className={`library ${isShowLibrary ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {
          songs.map(song => (
            <LibrarySong songs={songs} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} song={song} key={song.id} />
          ))
        }
      </div>
    </div>
  )
}

export default Library