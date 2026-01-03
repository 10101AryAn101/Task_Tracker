# Task Tracker

Full‑stack task tracking app built with React, Node.js, Express and MongoDB.

## Live Application

-https://task-tracker-live.onrender.com/

## Features

- Create, list, update and delete tasks
- Status updates (e.g. pending / in‑progress / completed)
- REST API with MongoDB

## Tech Stack

- **Client:** React, Vite, Axios  
- **Server:** Node.js, Express, MongoDB (Mongoose)

## Structure

- `client/` – frontend (Vite + React)
- `server/` – backend (Express + MongoDB)

## Local Setup

### 1. Backend

```bash
cd server
npm install
```

Create `.env` in `server`:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
CLIENT_ORIGIN=http://localhost:5173
```

Run:

```bash
npm run dev   # or npm start
```

### 2. Frontend

```bash
cd client
npm install
```

Create `.env` in `client`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Open: `http://localhost:5173`

## API (brief)

Base: `http://localhost:5000/api`

- `GET    /tasks`
- `POST   /tasks`
- `PUT    /tasks/:id`
- `DELETE /tasks/:id`


Make sure `CLIENT_ORIGIN` exactly matches the deployed client URL to avoid CORS issues.
