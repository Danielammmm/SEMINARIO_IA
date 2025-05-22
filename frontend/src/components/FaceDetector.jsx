// src/components/FaceDetector.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export const FaceDetector = ({ onFaceDetect, onExpression }) => {
  const videoRef = useRef(null);
  const [facePresent, setFacePresent] = useState(false);
  const [emotion, setEmotion] = useState('');

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error al acceder a la cámara', error);
      }
    };

    startVideo();
  }, []);

  useEffect(() => {
    const detectFace = async () => {
      if (videoRef.current) {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const isDetected = Boolean(detection);
        if (isDetected !== facePresent) {
          setFacePresent(isDetected);
          onFaceDetect?.(isDetected);
        }

        if (isDetected && detection.expressions) {
          const expressions = detection.expressions;
          const maxValue = Math.max(...Object.values(expressions));
          const dominantEmotion = Object.keys(expressions).find(
            (key) => expressions[key] === maxValue
          );
          setEmotion(dominantEmotion);
          onExpression?.(dominantEmotion); // opcional: para comunicar la emoción al padre
        }
      }
    };

    const interval = setInterval(detectFace, 1000);
    return () => clearInterval(interval);
  }, [facePresent, onFaceDetect]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="320" height="240" />
      <p>{facePresent ? '✅ Rostro detectado' : '❌ No se detecta rostro'}</p>
      {emotion && <p>😐 Emoción detectada: <strong>{emotion}</strong></p>}
    </div>
  );
};
