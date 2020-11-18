import React, { useState, useRef } from "react";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./data";
import "./styles/app.scss";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowLibrary, setIsShowLibrary] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandle = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  };

  const songEndHandle = async () => {
    let findIndex = songs.findIndex((song) => song.id === currentSong.id);
    const currentIndex = findIndex + 1;
    let newIndex = null;
    if (currentIndex > songs.length - 1) {
      newIndex = songs[0];
    } else {
      newIndex = songs[currentIndex];
    }

    await setCurrentSong(newIndex);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${isShowLibrary ? "library-active" : ""}`}>
      <Nav isShowLibrary={isShowLibrary} setIsShowLibrary={setIsShowLibrary} />
      <Song currentSong={currentSong} />
      <Player
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongs={setSongs}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songs={songs}
      />
      <Library
        setCurrentSong={setCurrentSong}
        songs={songs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        isShowLibrary={isShowLibrary}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandle}
        onLoadedMetadata={timeUpdateHandle}
        onEnded={songEndHandle}
      />
    </div>
  );
}

export default App;
