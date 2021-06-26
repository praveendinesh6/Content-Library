import { useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ src }) {
  const [playing, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [ended, setEnded] = useState(false);
  function handlePlayPause() {
    setIsPlaying(!playing);
    setEnded(false);
  }
  function handleEnded() {
    setIsPlaying(false);
    setEnded(true);
  }
  const handleDuration = (duration) => {
    setDuration(duration);
  };
  const handleProgress = ({ played }) => {
    setPlayed(played);
  };
  function remainingTime() {
    let remainingTime = duration * (1 - played);
    let minutes = Math.floor(remainingTime / 60);
    let seconds = Math.round(remainingTime % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <div className="player-container relative h-full">
      <div className="player-wrapper">
        <ReactPlayer
          url={src}
          width="100%"
          height="100%"
          playing={playing}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onProgress={handleProgress}
        />
      </div>
      <div
        className={`video-play-pause ${
          playing ? "video-playing" : ""
        } rounded-full cursor-pointer`}
        onClick={handlePlayPause}
      >
        <span>
          {playing ? (
            <img src="/svgs/pause.svg" />
          ) : (
            <img src="/svgs/play.svg" />
          )}
        </span>
      </div>
      <div className={`video-duration ${ended ? "hidden" : ""}`}>
        {remainingTime()}
      </div>
    </div>
  );
}

export default VideoPlayer;
