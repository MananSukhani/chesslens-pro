# ♟️ ChessLens PRO — Universal Chess Analyzer

A premium, browser-based chess analysis tool that combines **Lichess Cloud Engine** with a **local Stockfish WASM** fallback. Import games directly from Lichess or Chess.com and instantly get deep positional analysis — no server required.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

---

## ✨ Features

- **🌐 Dual Engine Analysis** — Queries the Lichess Cloud Eval API first (instant, cached positions), then falls back to a local Stockfish WASM engine running in a Web Worker.
- **📊 Live Evaluation Bar** — Visual eval bar showing advantage in real-time, normalized to White's perspective.
- **🎯 Auto Best Move** — Best move arrow and square highlights are always displayed on the board.
- **🔥 Endgame Boost** — When fewer than 10 pieces remain, analysis depth automatically increases to **30** (vs. 18 normally) for stronger endgame play.
- **📥 Game Import** — Fetch your recent games from **Lichess** or **Chess.com** by username.
- **🏹 Engine Arrows** — SVG arrows overlay the board showing the best move (green) and second-best continuation (blue).
- **📋 Interactive Move List** — Chess.com-style clickable notation panel with move navigation. Custom (variation) moves are highlighted in blue alongside the original game moves.
- **⚡ Play Best Move** — One-click button to play the engine's top suggestion on the board.
- **🔵 Legal Move Dots** — Click or hover on a piece to see legal move indicators, just like Chess.com.
- **⌨️ Keyboard Navigation** — Use `←` / `→` arrow keys to step through moves.

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| **UI**       | [React 18](https://react.dev/) (UMD) + [HTM](https://github.com/developit/htm) (JSX-like syntax, no build step) |
| **Styling**  | [Tailwind CSS](https://tailwindcss.com/) (Play CDN) + Vanilla CSS |
| **Board**    | [Chessboard.js](https://chessboardjs.com/) |
| **Logic**    | [Chess.js](https://github.com/jhlywa/chess.js) |
| **Engine**   | [Stockfish WASM](https://github.com/nicholasgasior/stockfish.wasm) (runs locally in a Web Worker) |
| **Cloud**    | [Lichess Cloud Eval API](https://lichess.org/api#tag/Analysis) |

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No Node.js, no build tools, no server required

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MananSukhani/chesslens-pro.git
   cd chesslens-pro
   ```

2. **Open in browser**
   
   Simply open `index.html` in your browser. That's it — everything runs client-side.

   > **Note:** For the local Stockfish engine to work, you may need to serve the files via a local HTTP server due to Web Worker restrictions on `file://` origins:
   > ```bash
   > # Python
   > python -m http.server 8000
   > 
   > # Node.js
   > npx serve .
   > ```
   > Then open `http://localhost:8000`

### Usage

1. Enter your **Lichess** or **Chess.com** username in the Game Sync panel.
2. Click **Fetch** to load your recent games.
3. Select a game to import it.
4. Use the **navigation buttons** or **arrow keys** to step through moves.
5. The **eval bar**, **best move arrows**, and **engine analysis** update automatically for each position.

## 📁 Project Structure

```
chess/
├── index.html          # Entry point — loads all dependencies
├── css/
│   └── main.css        # Custom styles (eval bar, board highlights, scrollbar)
├── js/
│   ├── app.js          # Main application logic (React components + engine)
│   └── stockfish.js    # Stockfish WASM engine (Web Worker)
├── img/
│   └── chesspieces/    # Chess piece images
└── README.md
```

## 📝 License

This project is for personal/educational use. Stockfish is licensed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).
