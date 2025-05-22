// src/components/FaceRecognition.jsx
import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Cargar modelos
  const loadModels = async () => {
    const MODEL_URL = '/models'; // asegúrate de que esta carpeta exista en public/
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    console.log('Modelos cargados');
  };

  // Iniciar cámara
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error al acceder a la cámara', err));
  };

  useEffect(() => {
    loadModels().then(() => {
      startVideo();
    });
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.innerHTML = ''; // Limpia antes de agregar nuevo canvas
      canvasRef.current.append(canvas);

      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      const interval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks();

        const resized = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);
      }, 100);

      return () => clearInterval(interval);
    });
  }, []);

  return (
    <div>
      <h2>Detección Facial</h2>
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="720"
          height="560"
          style={{ borderRadius: '10px' }}
        />
        <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      </div>
    </div>
  );
};

export default FaceRecognition;
