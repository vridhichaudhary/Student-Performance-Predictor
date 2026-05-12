# Student Performance Predictor

An AI-powered educational analytics platform built with React, Django, and LangGraph.

## Architecture

This is a full-stack mono-repo containing:
- **`frontend/`**: React 19 + Vite + Tailwind CSS + Recharts
- **`backend/`**: Django + Django REST Framework + Celery + PostgreSQL + Redis + LangGraph

## Prerequisites

- Docker and Docker Compose
- Node.js >= 18 (if running frontend locally outside Docker)
- Python >= 3.11 (if running backend locally outside Docker)

## Getting Started (Docker Compose)

The easiest way to run the entire stack is using Docker Compose.

1. **Clone the repository**
2. **Environment Setup**
   - Copy `frontend/.env.example` to `frontend/.env`
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your OpenAI API Key and secret configurations.
3. **Start the containers**
   ```bash
   docker-compose up --build
   ```
4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000/api`

## Running Locally (Without Docker)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## AI Agent System

The backend utilizes a sophisticated multi-agent LangGraph system to:
- Discover hidden correlations in performance data
- Predict future exam scores using ML regression
- Provide personalized study recommendations using FAISS RAG
