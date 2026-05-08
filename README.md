# 🐄 Cattle Breed Classifier

> **AI-Powered Image Recognition for Indian Cattle Breeds**  
> Production-Ready Full-Stack ML Application

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C?style=flat-square&logo=pytorch)](https://pytorch.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![Accuracy](https://img.shields.io/badge/Model_Accuracy-80%25-00b894?style=flat-square)](#-model-performance)
[![Hugging Face](https://img.shields.io/badge/🤗_Spaces-Live_Demo-yellow?style=flat-square)](https://huggingface.co/spaces/punithkrishan147/cattle-breed-classifier)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo on Hugging Face](https://huggingface.co/spaces/punithkrishan147/cattle-breed-classifier) · [Documentation](#-documentation) · [Report Issue](../../issues)

</div>

---

## 📋 Quick Navigation

- [✨ Overview](#-overview)
- [📸 UI Screenshots](#-ui-screenshots)
- [🎯 Features](#-features)
- [📊 Model Performance](#-model-performance)
- [🏗️ Architecture & Design](#-architecture--design)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🔌 API Documentation](#-api-documentation)
- [📁 Project Structure](#-project-structure)
- [🗺️ Roadmap](#-roadmap)
- [📄 License](#-license)

---

## ✨ Overview

**Cattle Breed Classifier** is a production-ready full-stack machine learning application that automatically identifies **50 Indian cattle breeds** from photographs with **80% accuracy**. The system uses advanced deep learning techniques and provides explainable AI (XAI) visualizations to show why the model made each prediction.

### What It Does
1. **Detects** cattle in uploaded images using YOLOv8 object detection
2. **Classifies** the breed using a fine-tuned ResNet-50 CNN (50-class classification)
3. **Explains** predictions with Grad-CAM heatmaps showing model attention
4. **Visualizes** results with confidence scores, breed information, and certificates

---

## 📸 UI Screenshots

### 🏠 Home Page & 📤 Upload Page
![Home Page](public/screenshots/ss_home.png)
![Upload Page](public/screenshots/ss_upload.png)

### 📊 Results Page & 📚 Breed Library
![Results Page](public/screenshots/ss_result.png)
![Breeds Page](public/screenshots/ss_breeds.png)

### 📈 Model Performance Dashboard & 📜 Prediction History
![Dashboard Page](public/screenshots/ss_dashboard.png)
![History Page](public/screenshots/ss_history.png)

---

## 🎯 Features

### 🎨 Frontend Features
- **Intuitive Upload Interface** - Drag-and-drop or click to upload cattle images
- **Real-time Classification** - Live prediction with confidence scores
- **Visual Explanations** - Grad-CAM heatmaps showing model decision-making
- **Breed Information** - Searchable database with origin, characteristics, and productivity stats
- **Result Certificates** - Printable classification certificates with unique IDs
- **Model Dashboard** - Visualization of per-breed metrics and confusion matrices
- **Prediction History** - Log of all classifications with CSV export
- **Responsive Design** - Works on desktop, tablet, and mobile with glassmorphism UI

### 🔧 Backend & ML Features
- **REST API** - Clean `/predict` endpoint with proper error handling and CORS
- **Multi-Stage Pipeline** - Object detection → Breed classification → Explainability
- **Explainable AI** - Grad-CAM heatmaps for model interpretability
- **Fast Inference** - Optimized for real-time predictions (~1.8s per image)

---

## 📊 Model Performance

### Overall Metrics
| Metric | Score | Metric | Score |
|---|---|---|---|
| **Overall Accuracy** | **80.0%** | **Test Set Size** | 1,715 images |
| **Macro Precision** | 81% | **Total Classes** | 50 breeds |
| **Macro Recall** | 79% | **Inference Time** | ~1.8s per image |

### 🐄 Top Performing Breeds — F1-Score
| Breed | F1-Score | Grade | Breed | F1-Score | Grade |
|---|---|---|---|---|---|
| Purnea | 98% | 🟢 Excellent | Siri | 93% | 🟢 Excellent |
| Bhelai | 98% | 🟢 Excellent | Poda Thirupu | 92% | 🟢 Excellent |
| Kosali | 96% | 🟢 Excellent | Bargur | 91% | 🟢 Excellent |
| Umblachery | 94% | 🟢 Excellent | Dangi | 91% | 🟢 Excellent |
| Konkan Kapila | 93% | 🟢 Excellent | Lakhimi | 91% | 🟢 Excellent |

*(Note: Breeds like Gangatari, Malvi, and Red Sindhi currently have lower accuracy due to limited training data and are priority for future fine-tuning.)*

**Detector**: YOLOv8-nano with cattle-specific fine-tuning  
**Classifier**: ResNet-50 with custom classification head (MixUp Augmentation, Class-Weighted Sampling, Label Smoothing).

---

## 🏗️ Architecture & Design

### 🎨 Design System ("Digital Pasture")
The UI utilizes a modern glassmorphism design:
- **Colors**: Primary `#006b55`, Background `#e9ffeb`, Interactive glows `rgba(120,249,204,0.3)`
- **Styling**: `backdrop-filter: blur(14px)`, ambient shadows, progressive rounding
- **Typography**: Manrope (Headings), Inter (Body)

### System Flow
1. **Frontend (React/Vite)** sends Image via REST API to **Backend (Flask)**.
2. **YOLOv8** locates the cattle and extracts bounding box.
3. **ResNet-50** analyzes the crop and predicts probabilities for 50 breeds.
4. **Grad-CAM** generates an attention heatmap.
5. **Frontend** visually displays the bounding box, heatmap, and breed database info.

---

## 💻 Tech Stack

- **Frontend**: React 19, React Router v7, Vite 5, Vanilla CSS
- **Backend**: Flask 3.x, Flask-CORS
- **Machine Learning**: PyTorch 2.x, TorchVision, Ultralytics (YOLOv8), OpenCV, scikit-learn
- **DevOps**: Docker, Docker Compose, Make, Hugging Face Spaces

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js 18+** & **Python 3.10+**
- **Docker & Docker Compose** (Optional but recommended)

### Option 1: Docker (Recommended)
You can easily spin up the entire application using our unified `Makefile`:
```bash
# Clone the repository
git clone https://github.com/punithkrishnakeepudi/Cattle-Breed-Classifier-ml-.git
cd Cattle-Breed-Classifier-ml-

# Build and Start
make build
make up

# View Logs (to verify startup)
make logs

# Stop the application
make down
```
*Frontend will be at http://localhost:3001 | Backend will be at http://localhost:5001*

> [!NOTE]
> The Docker deployment has been recently updated to include all necessary system libraries (`libgl1`, `libglib2.0-0`, etc.) for OpenCV and YOLOv8 to run seamlessly on lean Linux distributions.


### Option 2: Local Development (Without Docker)
If you don't have Docker installed, the `Makefile` still has you covered!
```bash
# Install all dependencies (Node and Python)
make install-local

# Start the Backend API (Terminal 1)
make run-backend-local

# Start the Frontend App (Terminal 2)
make run-frontend-local
```
*Frontend will be at http://localhost:5173 | Backend will be at http://localhost:5001*

### Option 3: Hugging Face Spaces (No Installation)
You can try out the live model directly on Hugging Face Spaces without installing anything!
👉 **[Try the Cattle Breed Classifier on Hugging Face Spaces](https://huggingface.co/spaces/punithkrishan147/cattle-breed-classifier)**

### See all commands
Run `make` or `make help` to see a full list of available commands.

---

## 🔌 API Documentation

### POST `/predict`
Classify cattle breed from an image.
```bash
curl -X POST http://localhost:5001/predict -F "image=@path/to/image.jpg"
```
Returns a JSON object containing `breed`, `confidence`, `top_5_predictions`, `heatmap`, `processing_time_ms`, etc.

### GET `/breeds`
Returns a list of all 50 supported cattle breeds and their metadata.

---

## 📁 Project Structure

```
hemanth-prj/
├── backend/          # Flask API (app.py) & requirements
├── data/             # Training data for 50 breeds
├── models/           # YOLOv8 and ResNet-50 weights (.pt, .pth)
├── scripts/          # ML Training, evaluation, and fine-tuning scripts
├── reports/          # Evaluation reports and confusion matrices
├── src/              # React frontend (Pages, Components, Data)
├── public/           # Static assets, screenshots, reference images
├── Dockerfile.*      # Container configurations
├── docker-compose.*  # Orchestration
└── Makefile          # Build & run commands
```



## 📄 License

This project is licensed under the **MIT License** — see `LICENSE` for details.

<div align="center">
  <br/>
  <p>Made with ❤️ for Indian Agriculture</p>
  <p>🐄 Classify · 🧠 Understand · 📊 Improve</p>
</div>
