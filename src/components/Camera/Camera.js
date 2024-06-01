import { useRef, useEffect } from "react";
import classes from "./Camera.module.css";

const Camera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });
  }, []);

  return (
    <div className={classes.camera}>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default Camera;
