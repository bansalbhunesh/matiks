# 🏆 Matiks Leaderboard System

A scalable, high-performance leaderboard system engineered to handle millions of users with **O(1)** ranking complexity. Developed for the Matiks Full-Stack Engineer Intern Assignment.

🔗 **Live Demo**: [https://matiks-leaderboard-demo-123.netlify.app](https://matiks-leaderboard-demo-123.netlify.app)  
*(Note: Requires the backend to be running locally via tunnel for the live demo to fetch data)*

---

## 🚀 Key Features

-   **Constant Time Ranking**: Utilizes a **Frequency Bucket Algorithm** to ensure `GetRank` and `UpdateScore` operations remain $O(1)$, regardless of whether there are 10 thousand or 10 million users.
-   **Tie-Aware Ranking**: Implements standard competition ranking (e.g., if two users match at Rank 1, the next user is Rank 3).
-   **Real-Time Simulation**: A background worker simulates live gameplay by updating random user scores every 200ms.
-   **Instant Search**: Search for any user by name to get their live global rank immediately.
-   **Premium UX**: Built with React Native (Expo) featuring a responsive Dark Mode design and gold/silver/bronze rank highlights.

---

## 🧪 Seeded Test Data

Upon startup, the system automatically seeds **10,000 users**.
We have explicitly included the following test cases to verify search and ranking logic:

| Username | Score | Expected Behavior |
| :--- | :--- | :--- |
| **matiks_admin** | `5000` | Should be **Rank #1** (Max Score) |
| **rahul** | `4600` | High rank, useful for testing search |
| **rahul_burman** | `3900` | Ties with `rahul_mathur` |
| **rahul_mathur** | `3900` | Ties with `rahul_burman` (Same Rank) |
| **rahul_kumar** | `1234` | Mid-tier rank |

*Plus 9,995 randomly generated users `user_1` to `user_10000`.*

---

## 🛠 Technology Stack

### Backend (Go)
-   **Language**: Go 1.21+
-   **Architecture**: In-Memory Frequency Buckets (`[5001]int`) + Hash Map
-   **Concurrency**: Mutex-protected reads/writes; Background Goroutines

### Frontend (React Native)
-   **Framework**: Expo (React Native)
-   **Platform**: Web, Android, iOS
-   **Styling**: Custom StyleSheet (Dark Theme)

---

## 🏎️ Performance & Algorithm

### The "Frequency Bucket" Approach
Storing millions of users in a sorted list requires $O(\log N)$ or $O(N)$ insertion time.
Instead, given that scores are bounded between **100 and 5000**, we use a frequency array:

1.  **Storage**: An array `Count[5001]` where `Count[s]` = number of users with score `s`.
2.  **Get Rank**: To find the rank of score `S`, we sum `Count[i]` for all `i > S`.
    -   Max iterations: 5000 (Constant).
    -   Speed: < 1 microsecond.
3.  **Tie Handling**: Implicit. If `Count[5000] == 2`, then anyone with score 4999 starts at Rank ($2+1$) = 3.

---

## 💻 Running Locally

### 1. Backend Setup
Navigate to the backend directory and run the server.

```bash
cd backend
go mod tidy
go run main.go
```
*Server runs on `http://localhost:8080`*

### 2. Frontend Setup
Open a new terminal.

```bash
cd frontend
npm install
npm start
```
*Press `w` for Web, `a` for Android.*

---

## 🌐 Deployment Guide

### Frontend
Deployed via [Netlify](https://www.netlify.com/).
-   Build command: `npx expo export -p web`
-   Publish directory: `dist`

### Backend
Currently hosted locally and exposed via **Localtunnel** for the demo.
For production, deploy the Go binary to **Railway**, **Render**, or an **AWS EC2** instance.

---

## 👤 Author

**Bhunesh Bansal**  
*Full-Stack Engineer Applicant*