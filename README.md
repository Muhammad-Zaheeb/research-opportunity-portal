# University Research Opportunity Portal

A web application for managing university research opportunities using FastAPI, MySQL, HTML, CSS, JavaScript, and Bootstrap.

## Features
- View all research opportunities and their details
- Create, update, and delete opportunities
- Change status from Open to Closed
- Validate required fields and display messages

## Technology
- Backend: Python, FastAPI
- Database: MySQL
- Frontend: HTML, CSS, JavaScript, Bootstrap
- API testing: Postman

## Project Structure
- `backend/` — API source code
- `frontend/` — User interface
- `database/schema.sql` — Database setup
- `postman/` — Postman collection

## Setup

### 1. Database
Start MySQL and run from the project root:

`mysql -u root < database/schema.sql`

Ensure the connection settings in `backend/app/database.py` match your local MySQL configuration.

### 2. Backend dependencies
Run from the project root:

`python3 -m venv backend/venv`

`source backend/venv/bin/activate`

`pip install -r backend/requirements.txt`

### 3. Start backend
Run from the project root:

`uvicorn backend.app.main:app --reload`

API: http://127.0.0.1:8000  
API documentation: http://127.0.0.1:8000/docs

### 4. Start frontend
Open another terminal and run:

`cd ~/Desktop/research-opportunity-portal/frontend`

`python3 -m http.server 5500`

Frontend: http://127.0.0.1:5500

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/opportunities` | List opportunities |
| POST | `/api/opportunities` | Create opportunity |
| GET | `/api/opportunities/{opportunity_id}` | Get one opportunity |
| PUT | `/api/opportunities/{opportunity_id}` | Update opportunity |
| DELETE | `/api/opportunities/{opportunity_id}` | Delete opportunity |

## Postman
Import the exported collection from the `postman/` directory and start the backend before testing.

## GitHub
https://github.com/Muhammad-Zaheeb/research-opportunity-portal
