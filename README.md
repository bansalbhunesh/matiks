# Matiks Leaderboard System

A high-performance, real-time leaderboard system designed to handle millions of users with O(1) ranking complexity. Built for the Matiks Full-Stack Engineer Intern Assignment.

![Leaderboard Demo](https://img.shields.io/badge/Status-Live-success) ![Go](https://img.shields.io/badge/Backend-Go-blue) ![React Native](https://img.shields.io/badge/Frontend-React%20Native-61dafb)

## 🚀 Features

-   **Scalable Architecture**: Uses a Frequency Bucket algorithm to ensure `GetRank` and `UpdateScore` are always **O(1)** (constant time), regardless of user count (10k or 10M).
-   **Real-time Updates**: Background simulation updates random user scores every 200ms.
-   **Live Search**: Instant user lookup with real-time global rank calculation.
-   **Tie-Aware Ranking**: Users with the same score share the same rank (e.g., 1, 2, 2, 4).
-   **Premium UI**: Dark-themed, responsive React Native interface with gold/silver/bronze highlights.
-   **Seeded Data**: Automatically seeds 10,000 users on startup.

## 🛠 Tech Stack

-   **Backend**: Go (Golang) 1.21+
-   **Frontend**: React Native (Expo)
-   **Deployment**: Netlify (Frontend), Self-hosted/Tunnel (Backend)

## 📂 Directory Structure

```
matiks/
├── backend/           # Go Server
│   ├── leaderboard/   # Core Ranking Logic (Service)
│   ├── main.go        # HTTP Server & Simulation
│   └── go.mod         # Dependencies
└── frontend/          # React Native App
    ├── src/           # Components & API
    └── App.js         # Entry Point
```

## ⚡ Getting Started

### Prerequisites

-   [Go 1.21+](https://go.dev/dl/)
-   [Node.js](https://nodejs.org/) & npm

### 1️⃣ Run the Backend

The backend runs on port `:8080`. It seeds data and starts the simulation immediately.

```bash
cd backend
go run main.go
```

Output:
```
Seeding 10,000 users...
Seeding complete.
Server starting on :8080
```

### 2️⃣ Run the Frontend

You can run the frontend on Web, Android, or iOS.

```bash
cd frontend
npm install
npm start
```

-   Press **`w`** for Web.
-   Press **`a`** for Android Emulator.
-   Press **`i`** for iOS Simulator (Mac only).

> **Note**: If running on a physical device, ensure your phone and computer are on the same Wi-Fi and update `src/api/client.js` with your computer's local IP.

## 🧠 Core Algorithm: Frequency Buckets

Instead of sorting millions of users (which costs $O(N \log N)$), we use a **Frequency Array** of size 5001 (scores 0-5000).

-   **Memory**: Fixed small array (~20KB).
-   **Rank Calculation**: To find a rank for score $S$, we simply sum the counts of all buckets $> S$.
-   **Complexity**: $O(K)$ where $K$ is the score range (5000), which is constant. This makes looking up a rank **instant** even with 100 million users.

## 🧪 Verified Requirements

-   [x] **10,000+ Users**: System handles 10k users in memory effortlessly.
-   [x] **Correct Ranks**: Validated tie-handling logic.
-   [x] **Random Updates**: Background goroutine simulates live activity.
-   [x] **Search**: Instant global rank lookup by username.
-   [x] **Responsiveness**: Smooth 60fps scrolling on the leaderboard.

## 🔗 Live Demo
-   **Frontend**: [Netlify Link](https://matiks-leaderboard-demo-123.netlify.app) (Requires backend running locally)