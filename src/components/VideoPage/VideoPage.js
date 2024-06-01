import React from "react";
import { Link } from "react-router-dom";

import classes from "./VideoPage.module.css";
const videos = [
  { id: 1, title: "Video 1", genre: "Adventure" },
  { id: 2, title: "Video 2", genre: "Drama" },
  // Add more videos as needed
];

const VideoPage = () => {
  return (
    <div>
      <h1>Video List</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <Link to={`/video/${video.id}`}>{video.title}</Link> - {video.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoPage;
