import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import classes from "./EmotionAnalysis.module.css";

const EmotionAnalysis = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const runEmotionAnalysis = async () => {
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      const video = videoRef.current;

      const detectEmotions = async () => {
        if (video.readyState === 4) {
          const predictions = await model.estimateFaces({ input: video });
          console.log(predictions);
        }
        requestAnimationFrame(detectEmotions);
      };

      detectEmotions();
    };

    runEmotionAnalysis();
  }, []);

  return (
    <div className={classes.emotionAnalysisContainer}>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default EmotionAnalysis;
