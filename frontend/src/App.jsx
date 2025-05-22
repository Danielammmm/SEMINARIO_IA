import React, { useState, useEffect } from 'react';
import { VoiceRecorder } from './components/VoiceRecorder';
import { FaceDetector } from './components/FaceDetector';
import MarioScene from './components/MarioModel';
import * as faceapi from 'face-api.js';
import './App.css';

function App() {
  const [level, setLevel] = useState('B1');
  const [transcription, setTranscription] = useState('');
  const [emotion, setEmotion] = useState('neutral');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [speakNow, setSpeakNow] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels().catch(console.error);
  }, []);

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setSpeakNow(true);
    utterance.onend = () => setSpeakNow(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleFaceDetect = (isDetected) => {
    setFaceDetected(isDetected);
  };

  const handleTranscription = (text) => {
    setTranscription(text);

    let response = '';
    if (text.toLowerCase().includes('hello')) response = 'Hello! How are you today?';
    else if (text.toLowerCase().includes('help')) response = 'I am here to help you with English.';
    else response = "Sorry, I didn't get that.";

    if (emotion === 'happy') response += ' 😊 You sound cheerful!';
    else if (emotion === 'sad') response += ' 😔 Stay positive!';
    else if (emotion === 'angry') response += " 😡 Let's calm down a bit.";

    speak(response);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎤 EnglishBuddy+</h1>
        <MarioScene isSpeaking={speakNow} />
      </div>

      <div className="main-content">
        <div className="left-panel">
          <label htmlFor="level">Selecciona tu nivel de inglés:</label>
          <select id="level" value={level} onChange={handleLevelChange}>
            <option value="A1">A1 - Principiante</option>
            <option value="A2">A2 - Básico</option>
            <option value="B1">B1 - Intermedio</option>
            <option value="B2">B2 - Alto intermedio</option>
            <option value="C1">C1 - Avanzado</option>
          </select>

          <p><strong>Nivel actual seleccionado:</strong> {level}</p>

          <h2 className="section-title">📓 Transcripción:</h2>
          <p>{transcription}</p>

          <h2 className="section-title">🧑‍💻 Detección Facial y Emocional:</h2>
          {modelsLoaded ? (
            <FaceDetector onFaceDetect={handleFaceDetect} onEmotionChange={setEmotion} />
          ) : (
            <p className="recording-status">🔄 Cargando modelos de detección...</p>
          )}
        </div>

        <div className="right-panel">
          <VoiceRecorder
            onTranscription={handleTranscription}
            faceDetected={faceDetected}
            emotion={emotion}
            onSpeak={() => setSpeakNow(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
