# SEMINARIO_IA

## Overview

**SEMINARIO_IA** is a full-stack application that integrates a React + Vite frontend with a Python backend. The backend is designed for audio processing, likely leveraging AI models (e.g., Whisper), while the frontend provides a modern, responsive user interface.

---

## Project Structure

```
SEMINARIO_IA/
├── README.md
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── whisper_handler.py
│   ├── __pycache__/
│   └── uploads/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── src/
│   ├── public/
│   └── ...
```

---

## Backend

- **Language:** Python 3.12+
- **Key Components:**
  - [`backend/app.py`](backend/app.py): Main backend application entry point.
  - [`backend/whisper_handler.py`](backend/whisper_handler.py): Handles audio processing, likely using Whisper or similar models.
  - [`backend/requirements.txt`](backend/requirements.txt): Python dependencies.
  - [`backend/uploads/`](backend/uploads/): Stores uploaded audio files.

### Setup

```sh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## Frontend

- **Framework:** React (with Vite)
- **Key Components:**
  - [`frontend/index.html`](frontend/index.html): HTML entry point.
  - [`frontend/src/`](frontend/src/): React source code.
  - [`frontend/public/`](frontend/public/): Static assets and ML models.
  - [`frontend/package.json`](frontend/package.json): Frontend dependencies and scripts.

### Setup

```sh
cd frontend
npm install
npm run dev
```

---

## Features

- Audio file upload and processing via the backend.
- Integration with AI models for speech-to-text or similar tasks.
- Modern frontend with React and Tailwind CSS.
- Modular and extensible architecture.

---

## Development

- **Frontend:** Hot Module Replacement (HMR) enabled via Vite.
- **Backend:** Easily extensible for additional endpoints or AI models.
- **Testing:** Add your preferred testing frameworks for both frontend and backend.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.# SEMINARIO_IA

