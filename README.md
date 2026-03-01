# ♟️ ChessLens PRO — Universal Chess Analyzer

A premium, browser-based chess analysis tool that combines **Lichess Cloud Engine** with a **local Stockfish WASM** fallback. Import games directly from Lichess or Chess.com and instantly get deep positional analysis — no server required.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

---

## ✨ Features

- **🌐 Tri-Engine Analysis** — Queries the **Lichess Cloud** and **Chess-api.com** first for instant, high-depth cached evaluations, then gracefully falls back to a massive local **Stockfish WASM** engine running in a Web Worker.
- **📊 Live Evaluation Bar** — Visual eval bar tracking the centipawn advantage in real-time.
- **🎯 Auto Best Move** — Best move arrows and expected responses are drawn directly on the board.
- **📥 Game Import** — Fetch your recent games instantly from **Lichess** or **Chess.com** by username.
- **💡 Smart Move Annotations** — Evaluates every move as you play through a game. Automatically detects and flags **Blunders (`!!`)**, **Mistakes (`?`)**, and **Missed Mates (`!`)** directly in the notation list if a player drops a significant advantage.
- **📋 Interactive Move List** — Clickable notation panel with move navigation and inline variation branching support.
- **🔵 Legal Move Dots** — Click or hover on a piece to see legal move indicators.
- **⌨️ Keyboard Navigation** — Use `←` / `→` arrow keys to rapidly step through moves.

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| **UI**       | [React 18](https://react.dev/) (UMD) + [HTM](https://github.com/developit/htm) (JSX-like syntax, no build step) |
| **Styling**  | [Tailwind CSS](https://tailwindcss.com/) (Play CDN) + Vanilla CSS |
| **Board**    | [Chessboard.js](https://chessboardjs.com/) |
| **Logic**    | [Chess.js](https://github.com/jhlywa/chess.js) |
| **Engine**   | [Stockfish WASM](https://github.com/nicholasgasior/stockfish.wasm) (Web Worker) |
| **Cloud APIs**| [Lichess Cloud Eval](https://lichess.org/api#tag/Analysis) / [Chess-api.com](https://chess-api.com/) / [Lichess Explorer](https://explorer.lichess.org/) |

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

## 🙏 Acknowledgements

A massive thank you to [**Chess-api.com**](https://chess-api.com/) and **Lichess** for providing incredibly robust, free, open-access endpoints that make the instant cloud-analysis features of this project possible. Their commitment to open chess developer tools is deeply appreciated.
