// --- GAME STATE ---
let players = ['red', 'green', 'yellow', 'blue'];
let turnIndex = 0;
let lastRoll = 0;
let canRoll = true;

const statusText = document.getElementById('status');
const diceBtn = document.getElementById('roll-btn');
const diceDisplay = document.getElementById('dice-display');

// --- SOUND ENGINE ---
function playSound(type) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'roll') { osc.type = 'square'; osc.frequency.setValueAtTime(440, audioCtx.currentTime); }
    if (type === 'move') { osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime); }
    if (type === 'unlock') { osc.type = 'triangle'; osc.frequency.setValueAtTime(1200, audioCtx.currentTime); }

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    osc.stop(audioCtx.currentTime + 0.1);
}

// --- DICE LOGIC ---
diceBtn.addEventListener('click', () => {
    if (!canRoll) return;
    
    playSound('roll');
    lastRoll = Math.floor(Math.random() * 6) + 1;
    const faces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    diceDisplay.innerText = faces[lastRoll];
    
    statusText.innerText = players[turnIndex].toUpperCase() + " rolled a " + lastRoll;
    
    // Logic: If no pieces can move and no 6 is rolled, skip turn
    canRoll = false; 
    diceBtn.style.opacity = "0.5";
});

// --- PIECE LOGIC ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('piece')) {
        let pieceColor = e.target.style.backgroundColor;
        
        if (pieceColor !== players[turnIndex]) {
            alert("It's not your turn!");
            return;
        }

        if (lastRoll === 6) {
            // UNLOCK PIECE
            e.target.style.position = "absolute";
            e.target.style.left = "50px"; // Simplified: Move to start
            playSound('unlock');
            statusText.innerText = "Piece Unlocked! Roll again.";
            canRoll = true;
            diceBtn.style.opacity = "1";
        } else if (lastRoll > 0) {
            // MOVE PIECE
            playSound('move');
            // Simplified movement logic
            statusText.innerText = "Piece Moved!";
            nextTurn();
        }
    }
});

function nextTurn() {
    turnIndex = (turnIndex + 1) % 4;
    diceBtn.style.backgroundColor = players[turnIndex];
    diceBtn.style.opacity = "1";
    canRoll = true;
    lastRoll = 0;
}

// Initialize Board (Same as before but adds colors to Dice)
diceBtn.style.backgroundColor = players[0];
