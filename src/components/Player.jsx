import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({ songs, audioRef, isPlaying, setIsPlaying, songInfo, setSongInfo, currentSong, setCurrentSong, setSongs }) => {

  const activeLibraryHandle = (nextPrev) => {
    const newSongs = songs.map(item => {
      if (item.id === nextPrev.id) {
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

  const playSongHandle = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const dragHandle = (event) => {
    const value = event.target.value
    audioRef.current.currentTime = value
    setSongInfo({ ...songInfo, currentTime: value })
  }

  const getTime = (time = 0) => {
    let formatTime = Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    if (formatTime === 'NaN:aN') {
      return '0:00'
    } else {
      return formatTime
    }
  }

  const skipTrackHandle = async (direction) => {
    let findIndex = songs.findIndex(song => song.id === currentSong.id)
    const currentIndex = direction === 'skip-back' ? findIndex - 1 : findIndex + 1
    let newIndex = null
    if (currentIndex < 0) {
      newIndex = songs[songs.length - 1]
    } else if (currentIndex > songs.length - 1) {
      newIndex = songs[0]
    } else {
      newIndex = songs[currentIndex]
    }

    await setCurrentSong(newIndex)
    activeLibraryHandle(newIndex)
    if (isPlaying) audioRef.current.play()
  }

  const trackAnimete = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }}>
          <input type="range" min={0} max={songInfo.duration || 0} onChange={dragHandle} value={songInfo.currentTime} />
          <div className="animate-track" style={trackAnimete} />
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" onClick={() => skipTrackHandle('skip-back')} size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" onClick={playSongHandle} size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward" onClick={() => skipTrackHandle('skip-foward')} size="2x" icon={faAngleRight} />
      </div>

    </div>
  )
}

export default Player