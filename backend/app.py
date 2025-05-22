# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import whisper
import tempfile

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = whisper.load_model("base")  # Puedes cambiar a 'tiny' o 'small' para mayor velocidad

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    audio_file = request.files["audio"]
    if audio_file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
            audio_file.save(tmp.name)
            result = model.transcribe(tmp.name, fp16=False)
            os.remove(tmp.name)

        return jsonify({"transcription": result["text"]})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Transcription failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
