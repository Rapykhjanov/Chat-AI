# V-Chat AI: Neon Tracking Interface

A futuristic virtual interview simulator built with **React** and **Tailwind CSS**. This project features a high-end "Cyberpunk" terminal aesthetic, integrating speech recognition to drive a dynamic video-based storytelling engine.

## Key Features
* **Voice-Driven Navigation**: Real-time speech-to-intent processing using the Web Speech API.
* **Dynamic Scenario Engine**: A state-machine-driven video player that transitions based on user input (Greeting, Weather, Status, etc.).
* **Neon Terminal UI**: A custom-designed interface featuring glassmorphism, CRT scan-line effects, and CSS-based neon glows.

## 🛠 Tech Stack
* **Frontend**: React.js
* **Styling**: Tailwind CSS
* **Speech Processing**: Web Speech Recognition API

##  Project Structure
The core application logic and assets are located here:
`projects/my-vidio-chat/src/App.jsx`

## Challenges & Solutions
* **Autoplay Restrictions**: Browsers block video with sound by default. I solved this by ensuring user interaction (Start button) before playback.
* **State Management**: Developed a robust state listener that only triggers transitions when the player is in the `idle` state to avoid logic conflicts.
* **Visual Identity**: Implemented a "CRT Monitor" effect using pure CSS to match the futuristic theme of the task.

##  Setup & Installation
1. Navigate to project folder: `cd projects/my-vidio-chat`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

##  License
MIT