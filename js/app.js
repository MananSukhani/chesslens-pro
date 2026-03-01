// Initialize HTM with React
const html = htm.bind(React.createElement);

const { useState, useEffect, useRef, useMemo } = React;

// Inline SVG icon component - avoids Lucide's DOM manipulation that conflicts with React
const Icon = ({ name, size, className }) => {
    const s = size || 20;
    const paths = {
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
        'chevrons-left': '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'chevron-right': '<path d="m9 18 6-6-6-6"/>',
        'chevrons-right': '<path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>',
        zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
        database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
        crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>',
        eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
        lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
        copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
        target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        'chevron-up': '<path d="m18 15-6-6-6 6"/>',
        'chevron-down': '<path d="m6 9 6 6 6-6"/>',
        settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
        upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
        x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    };
    const svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</svg>`;
    return html`<span className=${className || ''} dangerouslySetInnerHTML=${{ __html: svgHTML }} />`;
};

/**
 * Chessboard Component using ChessBoard.js (UMD)
 * Uses dangerouslySetInnerHTML to tell React: "don't reconcile my children"
 */
const ChessboardComponent = ({ fen, onMove, lastMove, bestMove, getLegalMoves }) => {
    const containerRef = useRef(null);
    const boardInstance = useRef(null);
    const onMoveRef = useRef(onMove);
    const getLegalMovesRef = useRef(getLegalMoves);

    // Always keep the latest refs so callbacks never go stale
    onMoveRef.current = onMove;
    getLegalMovesRef.current = getLegalMoves;

    const clearLegalDots = () => {
        if (!containerRef.current) return;
        containerRef.current.querySelectorAll('.legal-dot').forEach(el => el.remove());
        containerRef.current.querySelectorAll('.highlight-source').forEach(el => el.classList.remove('highlight-source'));
    };

    const showLegalDots = (square) => {
        clearLegalDots();
        if (!containerRef.current || !getLegalMovesRef.current) return;
        const moves = getLegalMovesRef.current(square);
        if (!moves || moves.length === 0) return;

        // Highlight the source square
        const sourceSq = containerRef.current.querySelector(`[data-square="${square}"]`);
        if (sourceSq) sourceSq.classList.add('highlight-source');

        moves.forEach(m => {
            const targetSq = containerRef.current.querySelector(`[data-square="${m.to}"]`);
            if (targetSq) {
                const dot = document.createElement('div');
                dot.className = 'legal-dot';
                // Check if target square has a piece (capture indicator)
                const hasPiece = targetSq.querySelector('[data-piece]') || targetSq.querySelector('img');
                if (hasPiece) {
                    dot.classList.add('legal-dot-capture');
                }
                targetSq.style.position = 'relative';
                targetSq.appendChild(dot);
            }
        });
    };

    useEffect(() => {
        if (!containerRef.current || boardInstance.current) return;

        // Create stable board div inside our container
        const boardDiv = document.createElement('div');
        boardDiv.style.width = '100%';
        containerRef.current.appendChild(boardDiv);

        boardInstance.current = ChessBoard(boardDiv, {
            position: fen,
            draggable: true,
            pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
            onDragStart: (source) => {
                showLegalDots(source);
            },
            onDrop: (source, target) => {
                clearLegalDots();
                const move = onMoveRef.current({ from: source, to: target });
                if (move === null) return 'snapback';
            },
            onSnapEnd: () => {
                clearLegalDots();
            },
            onMouseoutSquare: () => {
                // Dots cleared on drag start/drop, not hover
            }
        });

        // Click-to-select: clicking on a piece shows legal moves
        boardDiv.addEventListener('click', (e) => {
            const squareEl = e.target.closest('[data-square]');
            if (!squareEl) { clearLegalDots(); return; }
            const sq = squareEl.getAttribute('data-square');
            const hasPiece = squareEl.querySelector('img');
            if (hasPiece) {
                showLegalDots(sq);
            } else {
                clearLegalDots();
            }
        });

        setTimeout(() => {
            if (boardInstance.current) boardInstance.current.resize();
        }, 100);

        const handleResize = () => {
            if (boardInstance.current) boardInstance.current.resize();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update board position imperatively when fen changes
    useEffect(() => {
        if (boardInstance.current) {
            boardInstance.current.position(fen, false);
        }
        clearLegalDots();
    }, [fen]);

    // Highlight squares for last move and best move
    useEffect(() => {
        if (!containerRef.current) return;
        // Clear all highlights
        containerRef.current.querySelectorAll('.highlight-lastmove, .highlight-bestmove').forEach(el => {
            el.classList.remove('highlight-lastmove', 'highlight-bestmove');
        });
        // Apply last move highlight
        if (lastMove) {
            const fromSq = containerRef.current.querySelector(`[data-square="${lastMove.from}"]`);
            const toSq = containerRef.current.querySelector(`[data-square="${lastMove.to}"]`);
            if (fromSq) fromSq.classList.add('highlight-lastmove');
            if (toSq) toSq.classList.add('highlight-lastmove');
        }
        // Apply best move highlight
        if (bestMove) {
            const fromSq = containerRef.current.querySelector(`[data-square="${bestMove.from}"]`);
            const toSq = containerRef.current.querySelector(`[data-square="${bestMove.to}"]`);
            if (fromSq) fromSq.classList.add('highlight-bestmove');
            if (toSq) toSq.classList.add('highlight-bestmove');
        }
    }, [lastMove, bestMove, fen]);

    // dangerouslySetInnerHTML tells React: "I own this node's children, don't touch them"
    return html`<div ref=${containerRef} dangerouslySetInnerHTML=${{ __html: '' }} className="w-full aspect-square" />`;
};

const Header = () => html`
    <nav className="flex items-center justify-between px-8 py-4 glass sticky top-0 z-50">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-chess-accent rounded-xl flex items-center justify-center shadow-glow">
                <${Icon} name="shield" size=${24} className="text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-white">ChessLens <span className="text-[10px] text-chess-accent ml-1 px-1.5 py-0.5 border border-chess-accent rounded uppercase font-black">PRO</span></h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Universal Cloud Analyzer</p>
            </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-chess-accent animate-pulse"></div>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">100% Cloud Active</span>
            </div>
        </div>
    </nav>
`;

const EvalBar = ({ score }) => {
    const percentage = useMemo(() => {
        if (!score) return 50;
        if (score.type === 'mate') return score.value > 0 ? 100 : 0;
        const cp = score.value / 100;
        const bounded = Math.max(-10, Math.min(10, cp));
        return 50 + (bounded * 5);
    }, [score]);

    const formattedScore = useMemo(() => {
        if (!score) return "0.0";
        if (score.type === 'mate') return "#" + score.value;
        const val = score.value / 100;
        return val > 0 ? "+" + val.toFixed(1) : val.toFixed(1);
    }, [score]);

    return html`
        <div className="flex flex-col items-center h-full gap-2 py-4">
            <div className="eval-bar-container">
                <div
                    className="eval-bar-fill"
                    style=${{ height: percentage + '%' }}
                ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 font-mono">${formattedScore}</span>
        </div>
    `;
};

const GameImport = ({ onImport }) => {
    const [source, setSource] = useState('lichess');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const pgnFileRef = useRef(null);

    const handlePgnUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const pgn = evt.target.result;
            try {
                const testGame = new Chess();
                const loaded = testGame.load_pgn(pgn);
                if (!loaded && testGame.history().length === 0) {
                    alert('Invalid PGN file. Could not parse any moves.');
                    return;
                }
                setSelectedGame({ source: 'pgn', data: pgn });
                setCollapsed(true);
                onImport({ source: 'pgn', data: { pgn } });
            } catch (err) {
                console.error('PGN parse error:', err);
                alert('Failed to parse PGN file: ' + err.message);
            }
        };
        reader.readAsText(file);
        // Reset so the same file can be re-uploaded
        e.target.value = '';
    };

    const fetchLichess = async () => {
        const response = await fetch("https://lichess.org/api/games/user/" + username + "?max=10", {
            headers: { 'Accept': 'application/x-ndjson' }
        });
        if (!response.ok) throw new Error("Could not find Lichess user");
        const text = await response.text();
        return text.trim().split('\n').map(line => JSON.parse(line));
    };

    const fetchChesscom = async () => {
        const archivesResp = await fetch("https://api.chess.com/pub/player/" + username + "/games/archives");
        if (!archivesResp.ok) throw new Error("Could not find Chess.com user");
        const { archives } = await archivesResp.json();
        if (!archives || archives.length === 0) return [];
        const latestArchive = archives[archives.length - 1];
        const gamesResp = await fetch(latestArchive);
        const data = await gamesResp.json();
        return data.games.reverse().slice(0, 10);
    };

    const handleFetch = async () => {
        if (!username) return;
        setLoading(true);
        setGames([]);
        setCollapsed(false);
        try {
            const parsedGames = source === 'lichess' ? await fetchLichess() : await fetchChesscom();
            if (parsedGames.length > 0) {
                setGames(parsedGames);
            } else {
                alert("No recent games found.");
            }
        } catch (e) {
            console.error("Fetch error:", e);
            alert("Error: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGameSelect = (gameData) => {
        setSelectedGame(gameData);
        setCollapsed(true);
        onImport(gameData);
    };

    if (collapsed) {
        return html`
            <div className="flex items-center justify-between p-3 glass rounded-2xl w-full border border-white/5 shadow-lg flex-none">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chess-accent"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Game Loaded</span>
                    <span className="text-[10px] font-bold text-gray-600">${username}</span>
                </div>
                <button 
                    onClick=${() => setCollapsed(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                >
                    <span className="text-[9px] font-black uppercase tracking-widest">Expand</span>
                    <${Icon} name="chevron-down" size=${14} />
                </button>
            </div>
        `;
    }

    return html`
        <div className="flex flex-col gap-4 p-5 glass rounded-2xl w-full border-b border-white/5 shadow-2xl relative overflow-hidden flex-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-chess-accent/50 to-transparent"></div>
            
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Game Sync</h2>
                <div className="flex items-center gap-2">
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                        <button 
                            onClick=${() => { setSource('lichess'); setGames([]); }}
                            className=${`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${source === 'lichess' ? 'bg-[#e68a41] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >Lichess</button>
                        <button 
                            onClick=${() => { setSource('chesscom'); setGames([]); }}
                            className=${`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${source === 'chesscom' ? 'bg-[#81b64c] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >Chess.com</button>
                    </div>
                    ${selectedGame && html`
                        <button 
                            onClick=${() => setCollapsed(true)}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                        >
                            <${Icon} name="chevron-up" size=${16} />
                        </button>
                    `}
                </div>
            </div>
            
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder=${source === 'lichess' ? "Lichess ID" : "Chess.com ID"}
                    className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 flex-1 focus:outline-none focus:border-chess-accent/50 transition-all text-sm text-white placeholder:text-gray-700"
                    value=${username}
                    onChange=${(e) => setUsername(e.target.value)}
                />
                <button
                    onClick=${handleFetch}
                    disabled=${loading}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition-all text-white flex items-center justify-center min-w-[70px]"
                >
                    ${loading ? html`<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>` : 'Fetch'}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-white/5"></div>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/5"></div>
            </div>

            <input type="file" accept=".pgn" ref=${pgnFileRef} onChange=${handlePgnUpload} className="hidden" />
            <button
                onClick=${() => pgnFileRef.current && pgnFileRef.current.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all text-gray-400 hover:text-white active:scale-[0.98]"
            >
                <${Icon} name="upload" size=${14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Upload PGN File</span>
            </button>

            ${games.length > 0 && html`
                <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    ${games.map((g, i) => {
        let opponent, isWhite, date, result;

        if (source === 'lichess') {
            date = new Date(g.createdAt).toLocaleDateString();
            isWhite = g.players.white.user?.name?.toLowerCase() === username.toLowerCase();
            opponent = isWhite ? g.players.black.user?.name : g.players.white.user?.name;
            result = g.status;
        } else {
            date = new Date(g.end_time * 1000).toLocaleDateString();
            isWhite = g.white.username.toLowerCase() === username.toLowerCase();
            opponent = isWhite ? g.black.username : g.white.username;
            result = g.pgn.match(/\[Result "(.*?)"\]/)?.[1] || '---';
        }

        return html`
                            <div 
                                key=${i}
                                onClick=${() => handleGameSelect({ source, data: g })}
                                className="group bg-white/[0.03] hover:bg-white/10 border border-white/5 p-3 rounded-xl cursor-pointer transition-all active:scale-[0.98] flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors">vs ${opponent || 'Anonymous'}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className=${`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${isWhite ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}>${isWhite ? 'White' : 'Black'}</span>
                                        <span className="text-[9px] text-gray-500 font-medium">${date}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-chess-accent uppercase">${result}</p>
                                </div>
                            </div>
                        `;
    })}
                </div>
            `}
        </div>
    `;
};

/**
 * SVG Arrow Overlay - draws engine best-move arrows on the board
 */
const BoardArrows = ({ evaluation, showArrows, boardSize, gameFen }) => {
    if (!showArrows || !evaluation || !evaluation.pv || evaluation.pv.length === 0 || !boardSize || !gameFen) return null;

    const squareToCoords = (sq) => {
        const file = sq.charCodeAt(0) - 97;
        const rank = parseInt(sq[1]) - 1;
        const cellSize = boardSize / 8;
        return {
            x: file * cellSize + cellSize / 2,
            y: (7 - rank) * cellSize + cellSize / 2
        };
    };

    // Validate a UCI move is legal in the given FEN
    const tryMove = (fen, uci) => {
        if (!uci || uci.length < 4) return null;
        try {
            const g = new Chess(fen);
            const result = g.move({ from: uci.substring(0, 2), to: uci.substring(2, 4), promotion: uci.length > 4 ? uci[4] : 'q' });
            return result ? g.fen() : null;
        } catch (e) { return null; }
    };

    const arrows = [];
    // Best move arrow (green) — validated against current position
    const bestMove = evaluation.pv[0];
    const afterBestFen = bestMove ? tryMove(gameFen, bestMove) : null;
    if (afterBestFen) {
        const from = squareToCoords(bestMove.substring(0, 2));
        const to = squareToCoords(bestMove.substring(2, 4));
        arrows.push({ from, to, color: 'rgba(129, 182, 76, 0.8)', id: 'best' });

        // Expected response arrow (blue) — validated against position after best move
        if (evaluation.pv.length > 1) {
            const responseMove = evaluation.pv[1];
            if (tryMove(afterBestFen, responseMove)) {
                const from2 = squareToCoords(responseMove.substring(0, 2));
                const to2 = squareToCoords(responseMove.substring(2, 4));
                arrows.push({ from: from2, to: to2, color: 'rgba(82, 155, 235, 0.5)', id: 'response' });
            }
        }
    };

    if (arrows.length === 0) return null;

    const svgContent = arrows.map(a => {
        const dx = a.to.x - a.from.x;
        const dy = a.to.y - a.from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const headLen = boardSize / 25;
        const unitX = dx / len;
        const unitY = dy / len;
        const tipX = a.to.x - unitX * headLen * 0.3;
        const tipY = a.to.y - unitY * headLen * 0.3;
        const baseX = a.to.x - unitX * headLen;
        const baseY = a.to.y - unitY * headLen;
        const perpX = -unitY * headLen * 0.45;
        const perpY = unitX * headLen * 0.45;
        const sw = boardSize / 30;
        return `<line x1="${a.from.x}" y1="${a.from.y}" x2="${baseX}" y2="${baseY}" stroke="${a.color}" stroke-width="${sw}" stroke-linecap="round"/><polygon points="${tipX},${tipY} ${baseX + perpX},${baseY + perpY} ${baseX - perpX},${baseY - perpY}" fill="${a.color}"/>`;
    }).join('');

    return html`<div style=${{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 200 }} dangerouslySetInnerHTML=${{ __html: '<svg viewBox="0 0 ' + boardSize + ' ' + boardSize + '" style="width:100%;height:100%">' + svgContent + '</svg>' }} />`;
};

/**
 * MoveList - Chess.com style clickable notation panel with variation support
 */
const MoveList = ({ mainLineNotations, currentMoveIndex, onGoToMove, variationStartIndex, variationMoves, isOnVariation, history, analysisCache }) => {
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            const active = listRef.current.querySelector('.move-active');
            if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [currentMoveIndex]);

    if (!mainLineNotations || mainLineNotations.length === 0) return null;

    // Helper to calculate blunder/mistake annotations
    const getAnnotation = (moveIdx, isWhite) => {
        if (!history || !analysisCache || moveIdx === 0) return '';

        const prevFen = history[moveIdx - 1];
        const currFen = history[moveIdx];

        const prevEval = analysisCache[prevFen];
        const currEval = analysisCache[currFen];

        if (!prevEval || !currEval) return '';

        let prevScore = prevEval.type === 'mate' ? (Math.sign(prevEval.value) * 10000) - prevEval.value : prevEval.value;
        let currScore = currEval.type === 'mate' ? (Math.sign(currEval.value) * 10000) - currEval.value : currEval.value;

        // Invert view based on whose turn it was
        if (!isWhite) {
            prevScore = -prevScore;
            currScore = -currScore;
        }

        const drop = prevScore - currScore;

        // Completely lost a forced mate
        if (prevEval.type === 'mate' && Math.sign(prevEval.value) === (isWhite ? 1 : -1) && currEval.type !== 'mate') {
            return '<span class="text-red-500 font-bold ml-px">!</span>'; // Missed mate
        }

        if (drop >= 300) { // 3.00 pawn drop
            return '<span class="text-red-500 font-bold ml-px">!!</span>'; // Blunder
        } else if (drop >= 150) { // 1.50 pawn drop
            return '<span class="text-orange-400 font-bold ml-px">?</span>'; // Mistake
        }

        return '';
    };

    // Build main line pairs
    const mainPairs = [];
    for (let i = 0; i < mainLineNotations.length; i += 2) {
        const wAnn = getAnnotation(i + 1, true);
        const bAnn = (i + 1 < mainLineNotations.length) ? getAnnotation(i + 2, false) : '';

        mainPairs.push({
            num: Math.floor(i / 2) + 1,
            white: { san: mainLineNotations[i], idx: i + 1, ann: wAnn },
            black: i + 1 < mainLineNotations.length ? { san: mainLineNotations[i + 1], idx: i + 2, ann: bAnn } : null,
        });
    }

    // Build variation line entries if a variation exists
    const hasVariation = variationStartIndex !== null && variationMoves && variationMoves.length > 0;
    const variationEntries = [];
    if (hasVariation) {
        // Variation starts after variationStartIndex
        // First variation move index in the effective history = variationStartIndex + 1
        const varStartNotation = variationStartIndex; // notation index where variation branches
        for (let i = 0; i < variationMoves.length; i++) {
            variationEntries.push({
                san: variationMoves[i],
                effectiveIdx: variationStartIndex + 1 + i,
                moveNum: Math.floor((varStartNotation + i) / 2) + 1,
                isBlack: (varStartNotation + i) % 2 === 1,
                ann: '' // Annotations inside variations are harder to calculate without full branch evaluation history, skipped for now
            });
        }
    }

    // Render helper — pre-compute classNames for moves 
    const getMainMoveCls = (moveIdx) => {
        const isActive = !isOnVariation && currentMoveIndex === moveIdx;
        if (isActive) return 'px-2 py-1 rounded cursor-pointer transition-all flex-1 font-bold bg-chess-accent/25 text-chess-accent move-active';
        return 'px-2 py-1 rounded cursor-pointer transition-all flex-1 font-bold text-gray-300 hover:bg-white/10';
    };

    const getVarMoveCls = (effectiveIdx) => {
        const isActive = isOnVariation && currentMoveIndex === effectiveIdx;
        if (isActive) return 'px-2 py-1 rounded cursor-pointer transition-all font-bold bg-chess-accent/25 text-chess-accent move-active';
        return 'px-2 py-1 rounded cursor-pointer transition-all font-bold text-blue-400 hover:bg-blue-500/10';
    };

    return html`
        <div ref=${listRef} className="overflow-y-auto custom-scrollbar max-h-[180px] bg-black/20 rounded-xl border border-white/5 p-2">
            ${mainPairs.map(p => {
        const wCls = getMainMoveCls(p.white.idx);
        const bCls = p.black ? getMainMoveCls(p.black.idx) : '';
        // Check if variation branches right after white or black move of this pair
        const showVarAfterWhite = hasVariation && variationStartIndex === p.white.idx;
        const showVarAfterBlack = hasVariation && p.black && variationStartIndex === p.black.idx;
        const showVarAfterRow = showVarAfterWhite || showVarAfterBlack;

        return html`
                    <div key=${p.num}>
                        <div className="flex items-center gap-0.5 text-[11px] font-mono">
                            <span className="w-7 text-right pr-1.5 text-gray-600 font-bold text-[10px] flex-none">${p.num}.</span>
                            <span onClick=${() => onGoToMove(p.white.idx, true)} className=${wCls} dangerouslySetInnerHTML=${{ __html: p.white.san + p.white.ann }}></span>
                            ${p.black ? html`
                                <span onClick=${() => onGoToMove(p.black.idx, true)} className=${bCls} dangerouslySetInnerHTML=${{ __html: p.black.san + p.black.ann }}></span>
                            ` : html`<span className="flex-1"></span>`}
                        </div>
                        ${showVarAfterRow ? html`
                            <div className="ml-7 mt-0.5 mb-1 pl-2 border-l-2 border-blue-500/30 flex flex-wrap gap-0.5 items-center">
                                <span className="text-[8px] font-black text-blue-500/50 uppercase tracking-widest mr-1">var</span>
                                ${variationEntries.map(ve => {
            const vCls = getVarMoveCls(ve.effectiveIdx);
            const showNum = ve.isBlack ? null : html`<span className="text-[8px] text-blue-500/40 font-normal mr-0.5">${ve.moveNum}.</span>`;
            return html`<span key=${ve.effectiveIdx} onClick=${() => onGoToMove(ve.effectiveIdx)} className=${vCls + ' text-[11px] font-mono'}>${showNum}${ve.san}</span>`;
        })}
                            </div>
                        ` : null}
                    </div>
                `;
    })}
        </div>
    `;
};

/**
 * Settings Panel - overlay modal for depth selection and theme toggle
 */
const SettingsPanel = ({ isOpen, onClose, manualDepth, setManualDepth, darkMode, setDarkMode }) => {
    if (!isOpen) return null;

    const depthOptions = [
        { value: 0, label: 'Auto' },
        { value: 10, label: '10' },
        { value: 14, label: '14' },
        { value: 18, label: '18 (std)' },
        { value: 22, label: '22' },
        { value: 26, label: '26' },
        { value: 30, label: '30 (deep)' },
    ];

    const depthButtons = depthOptions.map(opt => {
        const cls = manualDepth === opt.value
            ? 'px-2 py-2 rounded-lg text-[10px] font-bold transition-all border bg-chess-accent/20 border-chess-accent/40 text-chess-accent'
            : 'px-2 py-2 rounded-lg text-[10px] font-bold transition-all border bg-white/[0.03] border-white/5 text-gray-400 hover:bg-white/[0.08] hover:text-white';
        return html`<button key=${opt.value} onClick=${() => setManualDepth(opt.value)} className=${cls}>${opt.label}</button>`;
    });

    const toggleCls = darkMode
        ? 'relative w-14 h-7 rounded-full transition-all border bg-chess-accent/20 border-chess-accent/30'
        : 'relative w-14 h-7 rounded-full transition-all border bg-yellow-500/20 border-yellow-500/30';
    const knobCls = darkMode
        ? 'absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all bg-chess-dark text-chess-accent'
        : 'absolute top-0.5 left-[26px] w-6 h-6 rounded-full flex items-center justify-center transition-all bg-yellow-400 text-yellow-900';
    const themeIcon = darkMode ? 'moon' : 'sun';
    const themeLabel = darkMode ? 'Dark mode' : 'Light mode';

    return html`
        <div className="fixed inset-0 z-[999] flex items-center justify-center" onClick=${onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative w-[340px] max-w-[90vw] bg-[#2a2725] rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col gap-5" onClick=${(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <${Icon} name="settings" size=${18} className="text-chess-accent" />
                        Settings
                    </h3>
                    <button onClick=${onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white">
                        <${Icon} name="x" size=${18} />
                    </button>
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Analysis Depth</label>
                    <p className="text-[9px] text-gray-600 font-medium">Auto: depth 18 normally, depth 30 in endgames</p>
                    <div className="grid grid-cols-4 gap-1.5 mt-1">${depthButtons}</div>
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Theme</label>
                        <p className="text-[9px] text-gray-600 font-medium mt-0.5">${themeLabel}</p>
                    </div>
                    <button onClick=${() => setDarkMode(!darkMode)} className=${toggleCls}>
                        <div className=${knobCls}>
                            <${Icon} name=${themeIcon} size=${12} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
};

/**
 * Arrow Legend - explains what each arrow color means
 */
const ArrowLegend = ({ showArrows }) => {
    if (!showArrows) return null;
    return html`
        <div className="flex flex-col gap-2 flex-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style=${{ background: 'rgba(129, 182, 76, 0.8)' }}></div>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Best Move</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style=${{ background: 'rgba(82, 155, 235, 0.5)' }}></div>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Expected Response</span>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-black text-xs">!!</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Blunder</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-orange-400 font-black text-xs">?</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Mistake</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-black text-xs">!</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Missed Mate</span>
                </div>
            </div>
        </div>
    `;
};

const App = () => {
    // Load persisted session
    const loadSession = () => {
        try {
            const saved = localStorage.getItem('chessLensSession');
            return saved ? JSON.parse(saved) : null;
        } catch (e) { return null; }
    };
    const session = loadSession() || {};

    const [game, setGame] = useState(() => {
        if (session.history && session.currentMoveIndex !== undefined && session.history[session.currentMoveIndex]) {
            return new Chess(session.history[session.currentMoveIndex]);
        }
        return new Chess();
    });
    const [history, setHistory] = useState(session.history || [new Chess().fen()]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(session.currentMoveIndex || 0);
    const [status, setStatus] = useState('Ready to analyze');
    const [evaluation, setEvaluation] = useState(null);

    const [moveNotations, setMoveNotations] = useState(session.moveNotations || []);
    const [mainLineNotations, setMainLineNotations] = useState(session.mainLineNotations || []);
    const [mainLineHistory, setMainLineHistory] = useState(session.mainLineHistory || [new Chess().fen()]);
    const [showArrows, setShowArrows] = useState(true);
    const [lastMove, setLastMove] = useState(session.lastMove || null);
    const [boardSize, setBoardSize] = useState(400);

    // Variation tracking
    const [variationStartIndex, setVariationStartIndex] = useState(session.variationStartIndex !== undefined ? session.variationStartIndex : null);
    const [variationMoves, setVariationMoves] = useState(session.variationMoves || []);
    const [variationHistory, setVariationHistory] = useState(session.variationHistory || []);
    const [isOnVariation, setIsOnVariation] = useState(session.isOnVariation || false);

    // Player Context (from GameImport)
    const [players, setPlayers] = useState(session.players || null);

    // Settings state
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [manualDepth, setManualDepth] = useState(0); // 0 = auto
    const [darkMode, setDarkMode] = useState(true);

    // Background analysis state
    const [analysisCache, setAnalysisCache] = useState(() => {
        try {
            const saved = localStorage.getItem('chessLensCache');
            return saved ? JSON.parse(saved) : {};
        } catch (e) { return {}; }
    });
    const analysisCacheRef = useRef(analysisCache);
    // Keep ref completely in sync with state
    useEffect(() => {
        analysisCacheRef.current = analysisCache;
    }, [analysisCache]);

    const bgAnalysisTotalState = useState(0);
    const [bgAnalysisTotal, setBgAnalysisTotal] = bgAnalysisTotalState;
    const [bgAnalysisProgress, setBgAnalysisProgress] = useState(0);
    const [bgAnalysisComplete, setBgAnalysisComplete] = useState(false);
    const bgAnalysisAbortRef = useRef(false);
    const manualDepthRef = useRef(manualDepth);
    const apiRequestCountRef = useRef(0);

    // Opening name state
    const [openingName, setOpeningName] = useState('');
    manualDepthRef.current = manualDepth;

    // Detect chess opening from Lichess explorer API
    const detectOpening = async (fen) => {
        try {
            const resp = await fetch('https://explorer.lichess.org/masters?fen=' + encodeURIComponent(fen));
            if (resp.ok) {
                const data = await resp.json();
                if (data.opening && data.opening.name) {
                    setOpeningName(data.opening.name);
                }
            }
        } catch (e) { /* opening detection is best-effort */ }
    };

    // Dark mode effect
    useEffect(() => {
        if (darkMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
    }, [darkMode]);

    // Persist session to localStorage
    useEffect(() => {
        const sessionData = {
            history, currentMoveIndex, moveNotations, mainLineNotations, mainLineHistory,
            lastMove, variationStartIndex, variationMoves, variationHistory, isOnVariation, players
        };
        try {
            localStorage.setItem('chessLensSession', JSON.stringify(sessionData));
        } catch (e) {
            // Ignore quota exceeded errors
        }
    }, [history, currentMoveIndex, moveNotations, mainLineNotations, mainLineHistory, lastMove, variationStartIndex, variationMoves, variationHistory, isOnVariation, players]);

    // Persist analysis cache to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('chessLensCache', JSON.stringify(analysisCache));
        } catch (e) { }
    }, [analysisCache]);

    // Initial analysis and opening detection hook
    useEffect(() => {
        runAnalysis(game.fen());
        detectOpening(game.fen());
    }, []);

    // Stockfish engine (lazy-loaded as Web Worker, persisted across renders)
    const stockfishRef = useRef(null);
    const engineAnalysisIdRef = useRef(0);
    const activeListenerRef = useRef(null);

    const getStockfish = () => {
        if (stockfishRef.current) return stockfishRef.current;
        try {
            const sf = new Worker('js/stockfish.js');
            sf.postMessage('uci');
            stockfishRef.current = sf;
            return sf;
        } catch (e) {
            console.error('Failed to init Stockfish:', e);
            return null;
        }
    };

    const runLocalEngine = (fen, depthOverride) => {
        return new Promise((resolve) => {
            const sf = getStockfish();
            if (!sf) { resolve(null); return; }

            // Assign a unique ID to this analysis call
            const analysisId = ++engineAnalysisIdRef.current;

            // Stop any in-progress search and remove old listener
            if (activeListenerRef.current) {
                sf.removeEventListener('message', activeListenerRef.current);
                activeListenerRef.current = null;
            }
            sf.postMessage('stop');

            // Count total pieces on the board from FEN
            const fenBoard = fen.split(' ')[0];
            const pieceCount = fenBoard.replace(/[^a-zA-Z]/g, '').length;
            const isBlackToMove = fen.split(' ')[1] === 'b';
            // Depth priority: depthOverride > manualDepthRef > auto
            const currentManualDepth = depthOverride || manualDepthRef.current;
            const searchDepth = currentManualDepth > 0 ? currentManualDepth : (pieceCount < 10 ? 30 : 18);

            let bestResult = null;
            const onMessage = (e) => {
                // If a newer analysis has started, discard this listener
                if (engineAnalysisIdRef.current !== analysisId) {
                    sf.removeEventListener('message', onMessage);
                    resolve(null);
                    return;
                }
                const line = typeof e.data === 'string' ? e.data : e.data?.toString() || '';
                if (line.startsWith('info depth')) {
                    const depthMatch = line.match(/depth (\d+)/);
                    const cpMatch = line.match(/score cp (-?\d+)/);
                    const mateMatch = line.match(/score mate (-?\d+)/);
                    const pvMatch = line.match(/ pv (.+)/);
                    const depth = depthMatch ? parseInt(depthMatch[1]) : 0;
                    if (depth >= 8 && (cpMatch || mateMatch) && pvMatch) {
                        const rawValue = mateMatch ? parseInt(mateMatch[1]) : parseInt(cpMatch[1]);
                        bestResult = {
                            type: mateMatch ? 'mate' : 'cp',
                            value: isBlackToMove ? -rawValue : rawValue,
                            pv: pvMatch[1].split(' ').filter(m => m && m.trim().length > 0),
                            depth: searchDepth
                        };
                    }
                }
                if (line.startsWith('bestmove')) {
                    sf.removeEventListener('message', onMessage);
                    activeListenerRef.current = null;
                    resolve(bestResult);
                }
            };
            activeListenerRef.current = onMessage;
            sf.addEventListener('message', onMessage);
            sf.postMessage('ucinewgame');
            sf.postMessage('position fen ' + fen);
            sf.postMessage('go depth ' + searchDepth);

            // Timeout safety
            setTimeout(() => {
                if (engineAnalysisIdRef.current === analysisId) {
                    sf.removeEventListener('message', onMessage);
                    activeListenerRef.current = null;
                    if (bestResult) resolve(bestResult);
                    else resolve(null);
                }
            }, searchDepth >= 30 ? 60000 : 15000);
        });
    };

    const fetchCloudEvaluation = async (fen) => {
        let result = null;

        // Step 1: Try Lichess Cloud Eval
        try {
            apiRequestCountRef.current++;
            const res1 = await fetch("https://lichess.org/api/cloud-eval?fen=" + encodeURIComponent(fen));
            if (res1.ok) {
                const data = await res1.json();
                if (data.pvs && data.pvs.length > 0) {
                    const topPv = data.pvs[0];
                    result = {
                        type: topPv.cp !== undefined ? 'cp' : 'mate',
                        value: topPv.cp !== undefined ? topPv.cp : topPv.mate,
                        pv: topPv.moves ? topPv.moves.split(' ') : [],
                        depth: data.depth || 0
                    };
                }
            }
            if (apiRequestCountRef.current % 3 === 0) await new Promise(r => setTimeout(r, 1000));
        } catch (e) { }

        if (result) return result;

        // Step 2: Try Chess-api.com
        try {
            apiRequestCountRef.current++;
            const res2 = await fetch("https://chess-api.com/v1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fen })
            });
            if (res2.ok) {
                const data = await res2.json();
                let type = 'cp';
                let value = 0;
                if (data.mate !== undefined && data.mate !== null) {
                    type = 'mate';
                    value = data.mate;
                } else if (data.eval !== undefined) {
                    value = Math.round(data.eval * 100);
                }
                // chess-api.com provides the PV array in `continuationArr` (which are UCI strings)
                let pvArray = [];
                if (data.continuationArr && Array.isArray(data.continuationArr)) {
                    pvArray = [...data.continuationArr];
                } else if (data.lan) {
                    pvArray = [data.lan];
                }

                // Sometimes continuationArr doesn't include the very actual bestmove at index 0
                // So if we have a lan bestmove, ensure it's at the start of our PV array
                if (data.lan && pvArray[0] !== data.lan) {
                    pvArray.unshift(data.lan);
                }

                pvArray = pvArray.filter(m => m && m.trim().length > 0);

                result = { type, value, pv: pvArray, depth: data.depth || 15 };
            }
            if (apiRequestCountRef.current % 3 === 0) await new Promise(r => setTimeout(r, 1000));
        } catch (e) { }

        return result;
    };

    const runAnalysis = async (fen) => {
        // Check cache first (from background analysis)
        if (analysisCacheRef.current[fen]) {
            setEvaluation(analysisCacheRef.current[fen]);
            setStatus('Cached Analysis');
            return;
        }

        setStatus('Querying Cloud Engine...');
        setEvaluation(null);

        const cloudResult = await fetchCloudEvaluation(fen);
        if (cloudResult && !bgAnalysisAbortRef.current) {
            // Need a deep copy so React state updates trigger properly
            const resultCopy = { ...cloudResult, pv: [...cloudResult.pv] };
            analysisCacheRef.current[fen] = resultCopy;
            setAnalysisCache(prev => ({ ...prev, [fen]: resultCopy }));
            setEvaluation(resultCopy);
            setStatus('Cloud Analysis Ready');
            return;
        }

        // Step 3: Fall back to local Stockfish
        const fenBoard = fen.split(' ')[0];
        const pieceCount = fenBoard.replace(/[^a-zA-Z]/g, '').length;
        const currentManualDepth = manualDepthRef.current;
        const searchDepth = currentManualDepth > 0 ? currentManualDepth : (pieceCount < 10 ? 30 : 18);
        setStatus(`Running Local Engine (Depth ${searchDepth})...`);
        try {
            const result = await runLocalEngine(fen);
            if (result) {
                analysisCacheRef.current[fen] = result;
                setAnalysisCache(prev => ({ ...prev, [fen]: result }));
                setEvaluation(result);
                setStatus(`Local Engine (Depth ${result.depth || searchDepth})`);
            } else {
                setStatus('Engine unavailable');
            }
        } catch (e) {
            console.error("Local engine failed:", e);
            setStatus('Analysis failed');
        }
    };

    // Background analysis: pre-analyze entire game, cloud eval first then local engine
    const runBackgroundAnalysis = async (positions) => {
        bgAnalysisAbortRef.current = false;
        setBgAnalysisProgress(0);
        setBgAnalysisTotal(positions.length);

        for (let i = 0; i < positions.length; i++) {
            if (bgAnalysisAbortRef.current) break;
            const fen = positions[i];
            // Skip if already cached via ref
            if (analysisCacheRef.current[fen]) {
                setBgAnalysisProgress(i + 1);
                continue;
            }

            let result = await fetchCloudEvaluation(fen);

            // Fall back to local Stockfish if cloud eval didn't work
            if (!result && !bgAnalysisAbortRef.current) {
                try {
                    const bgDepth = manualDepthRef.current > 0 ? manualDepthRef.current : undefined;
                    result = await runLocalEngine(fen, bgDepth);
                } catch (e) {
                    console.warn('Background analysis error for position', i, e);
                }
            }

            if (result && !bgAnalysisAbortRef.current) {
                const resultCopy = { ...result, pv: [...result.pv] };
                analysisCacheRef.current[fen] = resultCopy;
                setAnalysisCache(prev => ({ ...prev, [fen]: resultCopy }));
            }
            setBgAnalysisProgress(i + 1);
        }
        if (!bgAnalysisAbortRef.current) {
            setBgAnalysisComplete(true);
            setTimeout(() => {
                if (!bgAnalysisAbortRef.current) {
                    setBgAnalysisTotal(0); // Signal completion
                    setBgAnalysisComplete(false);
                }
            }, 2500);
        }
    };

    // Refs so keyboard handler and callbacks always read fresh state
    const historyRef = useRef(history);
    const mainLineHistoryRef = useRef(mainLineHistory);
    const moveIndexRef = useRef(currentMoveIndex);
    const isOnVariationRef = useRef(isOnVariation);
    const variationStartIndexRef = useRef(variationStartIndex);
    const variationHistoryRef = useRef(variationHistory);
    historyRef.current = history;
    mainLineHistoryRef.current = mainLineHistory;
    moveIndexRef.current = currentMoveIndex;
    isOnVariationRef.current = isOnVariation;
    variationStartIndexRef.current = variationStartIndex;
    variationHistoryRef.current = variationHistory;

    // Compute the "effective history" for navigation:
    // On main line: mainLineHistory
    // On variation: mainLineHistory[0..startIdx] + variationHistory[1..]
    const getEffectiveHistory = () => {
        if (isOnVariationRef.current && variationStartIndexRef.current !== null) {
            const startIdx = variationStartIndexRef.current;
            const varHist = variationHistoryRef.current;
            return [...mainLineHistoryRef.current.slice(0, startIdx + 1), ...varHist.slice(1)];
        }
        return mainLineHistoryRef.current;
    };

    const reconstructLastMove = (h, newIndex) => {
        if (newIndex > 0) {
            const prevGame = new Chess(h[newIndex - 1]);
            const possibleMoves = prevGame.moves({ verbose: true });
            const targetFen = h[newIndex].split(' ').slice(0, 4).join(' ');
            const found = possibleMoves.find(m => {
                prevGame.move(m);
                const matches = prevGame.fen().split(' ').slice(0, 4).join(' ') === targetFen;
                prevGame.undo();
                return matches;
            });
            return found ? { from: found.from, to: found.to } : null;
        }
        return null;
    };

    const navigate = (delta) => {
        const h = getEffectiveHistory();
        const idx = moveIndexRef.current;
        const newIndex = Math.max(0, Math.min(h.length - 1, idx + delta));
        if (newIndex !== idx) {
            // If navigating back past the variation start, return to main line
            if (isOnVariationRef.current && variationStartIndexRef.current !== null && newIndex <= variationStartIndexRef.current) {
                setIsOnVariation(false);
            }
            setCurrentMoveIndex(newIndex);
            const newGame = new Chess(h[newIndex]);
            setGame(newGame);
            setLastMove(reconstructLastMove(h, newIndex));
            runAnalysis(h[newIndex]);
            // Detect opening for first 30 half-moves
            if (newIndex <= 30) detectOpening(h[newIndex]);
        }
    };

    const goToMove = (index, forceMainLine) => {
        let h;
        if (forceMainLine) {
            // Clicking a main line move — exit variation
            h = mainLineHistory;
            setIsOnVariation(false);
            setVariationStartIndex(null);
            setVariationMoves([]);
            setVariationHistory([]);
        } else {
            h = getEffectiveHistory();
            // If navigating to or before the variation start, return to main line
            if (isOnVariationRef.current && variationStartIndexRef.current !== null && index <= variationStartIndexRef.current) {
                setIsOnVariation(false);
            }
        }
        const newIndex = Math.max(0, Math.min(h.length - 1, index));
        setCurrentMoveIndex(newIndex);
        const newGame = new Chess(h[newIndex]);
        setGame(newGame);
        setLastMove(reconstructLastMove(h, newIndex));
        runAnalysis(h[newIndex]);
        if (newIndex <= 30) detectOpening(h[newIndex]);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleImport = ({ source, data }) => {
        try {
            // Abort any running background analysis
            bgAnalysisAbortRef.current = true;

            const newGame = new Chess();
            const newHistory = [new Chess().fen()];
            const notations = [];

            if (source === 'lichess') {
                const moves = data.moves ? data.moves.split(' ') : [];
                newGame.reset();
                moves.forEach(m => {
                    const result = newGame.move(m);
                    if (result) notations.push(result.san);
                    newHistory.push(newGame.fen());
                });
            } else {
                newGame.load_pgn(data.pgn);
                const historyMoves = newGame.history();
                newGame.reset();
                historyMoves.forEach(m => {
                    const result = newGame.move(m);
                    if (result) notations.push(result.san);
                    newHistory.push(newGame.fen());
                });
            }

            setHistory(newHistory);
            setMainLineHistory([...newHistory]);  // Immutable copy
            setMoveNotations(notations);
            setMainLineNotations([...notations]); // Immutable copy
            setCurrentMoveIndex(newHistory.length - 1);
            setGame(newGame);
            setLastMove(null);
            // Clear any existing variation
            setVariationStartIndex(null);
            setVariationMoves([]);
            setVariationHistory([]);
            setIsOnVariation(false);

            // Extract players data
            let playerInfo = null;
            if (source === 'lichess') {
                playerInfo = {
                    white: {
                        name: data.players?.white?.user?.name || "Anonymous",
                        rating: data.players?.white?.rating || "?",
                        url: data.players?.white?.user?.id ? `https://lichess.org/@/${data.players.white.user.id}` : null
                    },
                    black: {
                        name: data.players?.black?.user?.name || "Anonymous",
                        rating: data.players?.black?.rating || "?",
                        url: data.players?.black?.user?.id ? `https://lichess.org/@/${data.players.black.user.id}` : null
                    }
                };
            } else if (source === 'chesscom') {
                // Chess.com structure
                playerInfo = {
                    white: {
                        name: data.white?.username || "Anonymous",
                        rating: data.white?.rating || "?",
                        url: data.white?.username ? `https://www.chess.com/member/${data.white.username}` : null
                    },
                    black: {
                        name: data.black?.username || "Anonymous",
                        rating: data.black?.rating || "?",
                        url: data.black?.username ? `https://www.chess.com/member/${data.black.username}` : null
                    }
                };
            }
            setPlayers(playerInfo);

            // Clear cache and start fresh background analysis
            setAnalysisCache({});
            setOpeningName('');
            runAnalysis(newGame.fen());
            // Detect opening from the last position
            detectOpening(newGame.fen());
            // Start background analysis after a small delay to let the current position analyze first
            setTimeout(() => {
                bgAnalysisAbortRef.current = false;
                setBgAnalysisComplete(false);
                runBackgroundAnalysis(newHistory);
            }, 500);
        } catch (e) {
            console.error("Import error:", e);
            alert("Failed to load game moves.");
        }
    };

    const handleMove = (moveData) => {
        const currentFen = game.fen();
        const newGame = new Chess(currentFen);
        const move = newGame.move({
            from: moveData.from,
            to: moveData.to,
            promotion: 'q'
        });

        if (move === null) return null;

        const idx = moveIndexRef.current;

        // Check if this move matches the main line's next move
        if (!isOnVariation && idx < mainLineHistory.length - 1) {
            const mainNextFen = mainLineHistory[idx + 1];
            if (newGame.fen() === mainNextFen) {
                // User played the main line move — stay on main line
                setCurrentMoveIndex(idx + 1);
                setGame(newGame);
                setLastMove({ from: moveData.from, to: moveData.to });
                setIsOnVariation(false);
                runAnalysis(newGame.fen());
                return move;
            }
        }

        // User deviated — create or extend a variation
        // NEVER modify mainLineHistory or mainLineNotations
        if (!isOnVariation) {
            // Starting a new variation from this point on the main line
            const newVarMoves = [move.san];
            const newVarHistory = [mainLineHistory[idx], newGame.fen()];
            setVariationStartIndex(idx);
            setVariationMoves(newVarMoves);
            setVariationHistory(newVarHistory);
            setIsOnVariation(true);
            setCurrentMoveIndex(idx + 1);
        } else {
            // Extending an existing variation
            const vIdx = currentMoveIndex - variationStartIndex;
            const newVarMoves = [...variationMoves.slice(0, vIdx), move.san];
            const newVarHistory = [...variationHistory.slice(0, vIdx + 1), newGame.fen()];
            setVariationMoves(newVarMoves);
            setVariationHistory(newVarHistory);
            setCurrentMoveIndex(variationStartIndex + newVarMoves.length);
        }

        setGame(newGame);
        setLastMove({ from: moveData.from, to: moveData.to });
        runAnalysis(newGame.fen());
        return move;
    };

    // Get legal moves for a given square (used by ChessboardComponent for move indicators)
    const getLegalMoves = (square) => {
        return game.moves({ square, verbose: true });
    };

    return html`
        <div className=${`h-screen flex flex-col overflow-hidden ${darkMode ? 'bg-[#0f0e0c]' : 'bg-[#f0ede8]'}`}>
            <${Header} />
            <${SettingsPanel} isOpen=${settingsOpen} onClose=${() => setSettingsOpen(false)} manualDepth=${manualDepth} setManualDepth=${setManualDepth} darkMode=${darkMode} setDarkMode=${setDarkMode} />
            <main className="flex-1 w-full mx-auto px-2 sm:px-4 lg:px-8 py-2 flex flex-col lg:flex-row gap-3 lg:gap-6 max-w-[1600px] min-h-0 overflow-y-auto lg:overflow-hidden">
                <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto custom-scrollbar pb-2 pr-1">
                    <div className="flex items-center justify-between bg-white/[0.03] p-2 rounded-2xl border border-white/5 flex-none">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">STATUS:</span>
                            <span className="text-[10px] sm:text-sm font-bold text-chess-accent uppercase tracking-widest truncate max-w-[140px] sm:max-w-none">${status}</span>
                            ${game.in_checkmate() ? html`<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 px-2 py-0.5 rounded-lg border border-red-500/30">Checkmate</span>`
            : game.in_stalemate() ? html`<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-lg border border-gray-500/30">Stalemate</span>`
                : game.in_draw() ? html`<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-lg border border-gray-500/30">Draw</span>`
                    : game.in_check() ? html`<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-lg border border-yellow-500/30">Check</span>`
                        : null}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-black/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/5">
                                Move ${Math.floor(currentMoveIndex / 2) + 1} / ${Math.floor((history.length - 1) / 2) + 1}
                            </div>
                            <button 
                                onClick=${() => setSettingsOpen(true)}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-chess-accent"
                                title="Settings"
                            >
                                <${Icon} name="settings" size=${16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4 lg:gap-8 items-center flex-1 min-h-0 justify-center w-full">
                        
                        <div className="hidden sm:flex h-full py-4 items-center">
                            <${EvalBar} score=${evaluation} />
                        </div>

                        <div className="flex-1 xl:flex-none flex flex-col justify-center items-center gap-2 sm:gap-3 min-h-0 w-full max-w-full lg:max-w-[min(100%,60vh)] xl:max-w-[min(100%,65vh)]">
                            
                            ${players && html`
                                <div className="xl:hidden w-full flex items-center justify-between px-2 mb-[-8px] z-10 relative">
                                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-t-lg border-x border-t border-white/10">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-black border border-gray-600 shadow-sm"></div>
                                        ${players.black.url ? html`
                                            <a href=${players.black.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-black tracking-wide text-gray-200 hover:text-chess-accent transition-colors">
                                                ${players.black.name}
                                            </a>
                                        ` : html`<span className="text-[11px] font-black tracking-wide text-gray-200">${players.black.name}</span>`}
                                        <span className="text-[10px] font-bold text-gray-500">(${players.black.rating})</span>
                                    </div>
                                </div>
                            `}

                            <div className="w-full lg:max-w-[480px] xl:max-w-[620px] aspect-square bg-chess-dark rounded-2xl p-2 sm:p-3 border border-white/10 shadow-2xl relative z-0" ref=${(el) => { if (el) { const w = el.querySelector('.board-b72b1')?.offsetWidth; if (w && w !== boardSize) setBoardSize(w); } }}>
                                <${ChessboardComponent} fen=${game.fen()} onMove=${handleMove} lastMove=${lastMove} bestMove=${evaluation && evaluation.pv && evaluation.pv[0] && evaluation.pv[0].length >= 4 ? { from: evaluation.pv[0].substring(0, 2), to: evaluation.pv[0].substring(2, 4) } : null} getLegalMoves=${getLegalMoves} />
                                <${BoardArrows} evaluation=${evaluation} showArrows=${showArrows} boardSize=${boardSize} gameFen=${game.fen()} />
                            </div>

                            ${players && html`
                                <div className="xl:hidden w-full flex items-center justify-between px-2 mt-[-8px] z-10 relative">
                                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-b-lg border-x border-b border-white/10">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-white border border-gray-400 shadow-sm"></div>
                                        ${players.white.url ? html`
                                            <a href=${players.white.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-black tracking-wide text-gray-200 hover:text-chess-accent transition-colors">
                                                ${players.white.name}
                                            </a>
                                        ` : html`<span className="text-[11px] font-black tracking-wide text-gray-200">${players.white.name}</span>`}
                                        <span className="text-[10px] font-bold text-gray-500">(${players.white.rating})</span>
                                    </div>
                                </div>
                            `}

                            <div className="xl:hidden w-full flex justify-center">
                                <${ArrowLegend} showArrows=${showArrows} />
                            </div>
                            
                            <div className="flex items-center gap-1 bg-black/50 p-1 sm:p-1.5 rounded-xl border border-white/10 flex-none z-10 mt-2">
                                <button onClick=${() => goToMove(0, true)} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-chess-accent">
                                    <${Icon} name="chevrons-left" size=${16} />
                                </button>
                                <button onClick=${() => navigate(-1)} className="w-8 h-8 sm:w-10 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-chess-accent">
                                    <${Icon} name="chevron-left" size=${18} />
                                </button>
                                <div className="px-2 sm:px-4 text-[9px] sm:text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] sm:tracking-[0.3em] cursor-default border-x border-white/5">
                                    Navigate
                                </div>
                                <button onClick=${() => navigate(1)} className="w-8 h-8 sm:w-10 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-chess-accent">
                                    <${Icon} name="chevron-right" size=${18} />
                                </button>
                                <button onClick=${() => goToMove(mainLineHistory.length - 1, true)} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-chess-accent">
                                    <${Icon} name="chevrons-right" size=${16} />
                                </button>
                                <button 
                                    onClick=${() => setShowArrows(!showArrows)}
                                    className=${`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-colors ${showArrows ? 'bg-chess-accent/20 text-chess-accent' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                                    title="Toggle arrows"
                                >
                                    <${Icon} name="trending-up" size=${14} />
                                </button>
                            </div>

                            ${/** Mobile-only inline eval display */ ''}
                            <div className="sm:hidden flex items-center justify-center gap-2 flex-none mt-2">
                                ${evaluation ? html`
                                    <div className=${`px-3 py-1 rounded-lg text-sm font-black font-mono ${evaluation.value >= 0 ? 'bg-white/10 text-white' : 'bg-gray-800 text-gray-400'}`}>
                                        ${evaluation.type === 'mate' ? '#' + evaluation.value : (evaluation.value > 0 ? '+' : '') + (evaluation.value / 100).toFixed(1)}
                                    </div>
                                ` : html`<span className="text-[10px] font-bold text-gray-600">No eval</span>`}
                            </div>
                        </div>

                        <div className="hidden xl:flex flex-col justify-center items-start w-40 shrink-0 h-full py-4 pl-4 gap-8">
                            ${players && html`
                                <div className="flex flex-col items-start gap-1 w-full text-left">
                                    <div className="flex items-center gap-2 justify-start opacity-70 mb-1">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-black border border-gray-600 shadow-sm shadow-black/50"></div>
                                        <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Black</span>
                                    </div>
                                    ${players.black.url ? html`
                                        <a href=${players.black.url} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-gray-200 hover:text-chess-accent truncate w-full tracking-wide">${players.black.name}</a>
                                    ` : html`<span className="text-sm font-black text-gray-200 truncate w-full tracking-wide">${players.black.name}</span>`}
                                    <span className="text-xs font-bold text-chess-accent opacity-80 tracking-widest">(${players.black.rating})</span>
                                </div>
                            `}
                            
                            <div className="w-full py-6">
                                <div className="flex justify-start opacity-70 hover:opacity-100 transition-opacity scale-95 origin-left">
                                    <${ArrowLegend} showArrows=${showArrows} />
                                </div>
                            </div>

                            ${players && html`
                                <div className="flex flex-col items-start gap-1 w-full text-left">
                                    <span className="text-xs font-bold text-chess-accent opacity-80 tracking-widest">(${players.white.rating})</span>
                                    ${players.white.url ? html`
                                        <a href=${players.white.url} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-gray-200 hover:text-chess-accent truncate w-full tracking-wide">${players.white.name}</a>
                                    ` : html`<span className="text-sm font-black text-gray-200 truncate w-full tracking-wide">${players.white.name}</span>`}
                                    <div className="flex items-center gap-2 justify-start opacity-70 mt-1">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-white border border-gray-400 shadow-sm shadow-black/50"></div>
                                        <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">White</span>
                                    </div>
                                </div>
                            `}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[380px] flex-none flex flex-col gap-3 min-h-0">
                    <${GameImport} onImport=${handleImport} />

                    ${bgAnalysisTotal > 0 ? html`
                        <div className="flex items-center gap-3 p-3 glass rounded-2xl border border-white/5 flex-none">
                            <div className=${`w-2 h-2 rounded-full ${bgAnalysisComplete ? 'bg-green-400' : 'bg-chess-accent animate-pulse'}`}></div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">${bgAnalysisComplete ? 'Analysis Complete' : 'Background Analysis'}</span>
                                    <span className=${`text-[9px] font-bold ${bgAnalysisComplete ? 'text-green-400' : 'text-chess-accent'}`}>${bgAnalysisProgress}/${bgAnalysisTotal}</span>
                                </div>
                                <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                                    <div className=${`h-full rounded-full transition-all duration-300 ${bgAnalysisComplete ? 'bg-green-400' : 'bg-chess-accent'}`} style=${{ width: (bgAnalysisProgress / bgAnalysisTotal * 100) + '%' }}></div>
                                </div>
                            </div>
                        </div>
                    ` : null}

                    <div className="flex-1 glass rounded-2xl p-3 sm:p-5 flex flex-col gap-3 border border-white/10 shadow-2xl min-h-0 overflow-hidden">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black flex items-center gap-2 text-white uppercase tracking-tighter">
                                <${Icon} name="zap" size=${18} className="text-chess-accent" />
                                Analysis
                            </h3>
                            ${evaluation && html`
                                <div className=${`px-3 py-1.5 rounded-xl text-sm font-black font-mono ${evaluation.value >= 0 ? 'bg-white/10 text-white' : 'bg-gray-800 text-gray-400'}`}>
                                    ${evaluation.type === 'mate' ? '#' + evaluation.value : (evaluation.value > 0 ? '+' : '') + (evaluation.value / 100).toFixed(1)}
                                </div>
                            `}
                        </div>

                        <div className="h-px bg-white/5 flex-none"></div>

                        ${openingName ? html`
                            <div className="flex items-center gap-2 p-2 bg-chess-accent/5 rounded-lg border border-chess-accent/10 flex-none">
                                <${Icon} name="file-text" size=${14} className="text-chess-accent flex-none" />
                                <span className="text-[10px] sm:text-[11px] font-bold text-chess-accent truncate">${openingName}</span>
                            </div>
                        ` : null}

                        <${MoveList} 
                            mainLineNotations=${mainLineNotations} 
                            currentMoveIndex=${currentMoveIndex} 
                            onGoToMove=${goToMove} 
                            variationStartIndex=${variationStartIndex} 
                            variationMoves=${variationMoves} 
                            isOnVariation=${isOnVariation} 
                            history=${mainLineHistory}
                            analysisCache=${analysisCache}
                        />


                        ${evaluation ? html`
                            <div className="flex flex-col gap-3">

                                <div className="bg-white/[0.03] rounded-2xl border border-white/5 overflow-hidden">
                                    <div className="flex items-center gap-2 px-4 pt-3 pb-2">
                                        <${Icon} name="trending-up" size=${14} className="text-chess-accent" />
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Engine Line</span>
                                    </div>
                                    <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                                        ${evaluation.pv && Array.isArray(evaluation.pv) ? evaluation.pv.slice(0, 10).map((move, i) => html`
                                            <span 
                                                key=${i}
                                                className=${`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all cursor-default ${i === 0
                                ? 'bg-chess-accent/20 text-chess-accent border border-chess-accent/30'
                                : 'bg-white/[0.04] text-gray-400 border border-white/5 hover:bg-white/[0.08]'
                            }`}
                                            >
                                                ${i % 2 === 0 ? html`<span className="text-[9px] text-gray-600 font-normal mr-0.5">${Math.floor(i / 2) + 1}.</span>` : null}
                                                ${move}
                                            </span>
                                        `) : null}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button 
                                        onClick=${() => {
                if (evaluation.pv) {
                    navigator.clipboard.writeText(evaluation.pv.join(' '));
                }
            }}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all text-gray-500 hover:text-white active:scale-[0.98]"
                                    >
                                        <${Icon} name="copy" size=${14} />
                                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Copy Line</span>
                                    </button>
                                    <button 
                                        onClick=${() => {
                if (evaluation.pv && evaluation.pv[0]) {
                    // Play the best move on the board
                    const bestMove = evaluation.pv[0];
                    const from = bestMove.substring(0, 2);
                    const to = bestMove.substring(2, 4);
                    handleMove({ from, to });
                }
            }}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-chess-accent/10 border border-chess-accent/20 hover:bg-chess-accent/20 transition-all text-chess-accent active:scale-[0.98]"
                                    >
                                        <${Icon} name="zap" size=${14} />
                                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Play Best</span>
                                    </button>
                                </div>
                            </div>
                        ` : html`
                            <div className="flex flex-col items-center justify-center text-gray-600 text-sm py-8 sm:py-16 text-center">
                                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-white/5 shadow-inner">
                                    <${Icon} name="target" size=${28} className="opacity-10" />
                                </div>
                                <p className="max-w-[220px] leading-relaxed font-medium uppercase text-[9px] sm:text-[10px] tracking-[0.3em] opacity-40">Make a move or import a game to begin analysis</p>
                            </div>
                        `}
                    </div>
                </div>
            </main>
        </div>
    `;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
