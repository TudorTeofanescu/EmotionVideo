import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import * as faceapi from "face-api.js";

import { createEmotionRecord } from "../../api/emotionsApi.js";

import classes from "./VideoEmotionRecording.module.css";

const videos = [
  { id: 1, title: "Video 1", url: "video1.mp4" },
  { id: 2, title: "Video 2", url: "video2.mp4" },
];

const VideoEmotionRecording = () => {
  const { id } = useParams();
  const video = videos.find((v) => v.id === parseInt(id));
  const videoPath = `/videos/${video.url}`;

  //video played out
  const videoRef = useRef(null);
  //user camera video
  const userVideoRef = useRef();
  const [loading, setLoading] = useState(true);
  const [emotions, setEmotions] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Loading face-api models...");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        setLoading(false);
      } catch (error) {
        console.log("Error loading face-api models: ", error);
        throw error;
      }
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          let video = userVideoRef.current;
          video.srcObject = stream;
          video.addEventListener("loadeddata", () => {
            video.play();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadModels().then(startVideo);

    const intervalId = setInterval(async () => {
      if (!userVideoRef.current || loading) return;
      const detections = await faceapi
        .detectAllFaces(
          userVideoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();
      if (detections.length > 0) {
        setEmotions(detections[0].expressions);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [loading]);
  // }, []);
  const getStrongestEmotion = (emotions) => {
    return Object.entries(emotions).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  };
  const handleStoreEmotionClick = async () => {
    try {
      const strongestEmotion = getStrongestEmotion(emotions);
      const emotionData = {
        videoId: video.id,
        emotion: strongestEmotion,
        videoTimestamp: videoRef.current.currentTime,
      };
      console.log({ emotionData });
      // send the current emotion state to the server
      await createEmotionRecord(emotionData);
      setError(null);
      setSuccess("Emotion stored successfully");
      setTimeout(() => setSuccess(null), 10000);
    } catch (error) {
      console.error("Failed to store emotion:", error);
      setError("Failed to store emotion: " + error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.videoContainer}>
        <video ref={videoRef} controls>
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className={classes.videoTitle}>{video.title}</h1>
      </div>
      <div className={classes.recordingContainer}>
        <div className={classes.userVideoContainer}>
          <h2>Your Webcam</h2>
          <video ref={userVideoRef} autoPlay muted></video>
        </div>
        <div className={classes.emotionsContainer}>
          <h2>Detected Emotions</h2>
          {loading ? <p>Loading model...</p> : null}
          {Object.entries(emotions).map(([emotion, value]) => (
            <p key={emotion}>
              {emotion}: {value.toFixed(2)}
            </p>
          ))}
        </div>
        <div className={classes.emotionsContainer}>
          <h2>Actions</h2>
          <button
            className={classes.storeEmotionButton}
            onClick={handleStoreEmotionClick}
          >
            Store Emotion
          </button>
          {error && <p className={classes.error}>{error}</p>}
          {success && <p className={classes.success}>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default VideoEmotionRecording;
