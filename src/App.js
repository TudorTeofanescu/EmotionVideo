import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoPage from "./components/VideoPage/VideoPage";
import VideoEmotionRecording from "./components/VideoPage/VideoEmotionRecording";
import Header from "./components/Header/Header";
import RecordingPage from "./components/RecordingPage/RecordingPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<VideoPage />} />
        <Route path="/video/:id" element={<VideoEmotionRecording />} />
        <Route path="/recording" element={<RecordingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
