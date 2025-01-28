# QueenB X AppsFlyer - BeSafe Hackathon 2025


<div id="header" align="center">
    <h1>SafeNet - Promoting Online Safety</h1>
</div>

Welcome to **SafeNet**, an innovative platform developed as part of the **BeSafe Hackathon 2025** in collaboration with **QueenB** and **AppsFlyer**. SafeNet's mission is to educate and empower users to navigate the internet safely through interactive games, structured lesson plans, and real-time support. The platform integrates cutting-edge technologies to provide an engaging and informative user experience.

![Main board image](screenshots/Screenshot%202025-01-21%20165530.png)

---

### Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Showcase](#showcase)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Authors](#authors)
- [Conclusion](#conclusion)

---

## Introduction

SafeNet is an educational platform designed to promote digital literacy and online safety. By combining interactive tools, real-time interactions, and curated content, the platform serves as a comprehensive solution for educators, students, and parents to address challenges in the digital space.

---

## Features

- **Interactive Games**:
  - **Memory Game**: Improves memory and awareness of online threats.
  - **Password Challenge**: Educates users on creating strong passwords.
  - **Phishing Hunter**: Teaches users to identify phishing attempts.
  - **Social Dilemmas**: A multiplayer game powered by WebSocket, simulating ethical scenarios online.
- **Lesson Plans for Teachers**: Tools for uploading, sharing, and accessing structured lesson plans.
- **Dynamic Blog**: Regular updates and insights on online safety.
- **Real-Time Chat Support**: WebSocket-powered chatbot for addressing user concerns.
- **Progress Tracking**: Leaderboard and progress bar for user engagement.

---

## Technologies

- **Frontend**:
  - React.js: Builds the dynamic user interface.
  - React Router: Enables seamless navigation.
  - Tailwind CSS: Provides a responsive and modern design.
- **Backend**:
  - Node.js and Express.js: Handles server-side logic and API requests.
  - SQLite: Lightweight database management.
  - WebSocket: Enables real-time multiplayer interactions in Social Dilemmas.
- **Other Tools**:
  - PDF.js: Previews uploaded lesson plans.
  - CORS: Ensures secure communication between frontend and backend.

---

## Showcase

### Home Page
![Home Page](screenshots/Screenshot%202025-01-21%20165254.png)

### For teachers
![Lesson Plans](screenshots/Screenshot%202025-01-21%20165320.png)

![Presention](screenshots/Screenshot%202025-01-21%20165416.png)

![Upload Lessons](screenshots/Screenshot%202025-01-21%20165450.png)


### Memory Game

![Memomry Geme](screenshots/Screenshot%202025-01-21%20165609.png)

### Password challenge

![Password challenge](screenshots/Screenshot%202025-01-21%20165711.png)

### Pishing Hunter

![Pishing Hunter](screenshots/Screenshot%202025-01-21%20165742.png)

### Social Dilemmas

![Leaderboard](screenshots/Screenshot%202025-01-21%20165826.png)

### ChatBot

![Chat Support](screenshots/Screenshot%202025-01-21%20165856.png)



---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SafeNet.git
   cd SafeNet
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   sqlite3 database.db < init.sql
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. **Run the Server**:
   Navigate to the server directory and start the Express server:

   ```bash
   cd server
   npm run dev
   ```

   The server will run on `http://localhost:5000` by default.

2. **Run the Client**:
   Open a new terminal, navigate to the client directory, and start the React client:

   ```bash
   cd client
   npm run dev
   ```

   The client will open in your default browser at `http://localhost:3000`.

3. **Interact with the Platform**:

   - Explore games, lesson plans, and other features through the client interface.
   - Participate in multiplayer games like Social Dilemmas.

---

## Project Structure

### Client Directory (`client/`)

Contains the React frontend application.

- `public/`: Static assets like logos and icons.
- `src/`: Source code including components, pages, and services.
- `App.jsx`: The main React component.
- `index.jsx`: Entry point for rendering the app.

### Server Directory (`server/`)

Contains the Node.js backend application.

- `controllers/`: Logic for handling API requests.
- `routes/`: API endpoints.
- `server.js`: Entry point for starting the server.
- `websocketServer.js`: Manages WebSocket interactions for Social Dilemmas.

---

## Authors
- **Noa Moscato**
- **Estee Cohen**
- **Hadar Dabush**
- **Meitar Teper**
- **Chen Kushelevitch**

---

## Conclusion

SafeNet is a robust platform designed to educate users on online safety while fostering engagement through interactive games and tools. With its comprehensive approach and innovative features, SafeNet is a valuable resource for educators, parents, and students. If you have any feedback or encounter issues, please open an issue in the repository.
