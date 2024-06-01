import classes from "./VideoPlayer.module.css";

const VideoPlayer = ({ src, onPlay }) => {
  return (
    <div className={classes.videoPlayer}>
      <video controls onPlay={onPlay}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
