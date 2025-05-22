import React, { useEffect, useRef } from 'react';

export const VoiceRecorder = ({ onTranscription, faceDetected, emotion, onSpeak }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!faceDetected) return;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          if (audioChunksRef.current.length === 0) return;

          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          audioChunksRef.current = [];

          const formData = new FormData();
          formData.append('audio', blob, 'audio.webm');

          try {
            const response = await fetch('http://localhost:5000/transcribe', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();
            if (data.transcription) {
              onTranscription(data.transcription);
              if (onSpeak) onSpeak(); // activa la animación de boca
            } else {
              console.warn('No transcription returned from backend.');
            }
          } catch (err) {
            console.error('Error sending audio to backend:', err);
          }
        };

        mediaRecorder.start();

        intervalRef.current = setInterval(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            mediaRecorder.start();
          }
        }, 7000); // Graba cada 7s

      } catch (error) {
        console.error('Microphone access error:', error);
      }
    };

    startRecording();

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [faceDetected]);

  return (
    <div>
      <p className="recording-status">
        {faceDetected ? '🎤 Listening...' : '🔇 Waiting for face...'}
      </p>
    </div>
  );
};
