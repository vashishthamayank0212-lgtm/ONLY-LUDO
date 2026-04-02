// --- GAME STATE ---
let players = ['red', 'green', 'yellow', 'blue'];
let turnIndex = 0;
let lastRoll = 0;
let canRoll = true;

const statusText = document.getElementById('status');
const diceBtn = document.getElementById('roll-btn');

// --- DICE LOGIC ---
diceBtn.addEventListener('click', () => {
    if (!canRoll) return;
    
    lastRoll = Math.floor(Math.random() * 6) + 1;
    const faces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    document.getElementById('dice').innerText = "🎲 Rolled: " + lastRoll;
    
    statusText.innerText = players[turnIndex].toUpperCase() + "'s Turn (Rolled " + lastRoll + ")";
    
    // Rule: If you roll a 6, you get another turn later, but you MUST move first
    canRoll = false; 
    diceBtn.style.opacity = "0.5";
});

// --- PIECE CLICK LOGIC ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('piece')) {
        let pieceColor = e.target.style.backgroundColor;
        
        // 1. Check if it's the right player's piece
        if (pieceColor !== players[turnIndex]) {
            statusText.innerText = "Wait! It is " + players[turnIndex] + "'s turn.";
            return;
        }

        // 2. UNLOCKING LOGIC (The 6 Rule)
        if (lastRoll === 6 && e.target.parentElement.classList.contains('pocket')) {
            // Move piece to the start square (This is a simplified visual jump)
            const startCell = document.querySelector('.cell:nth-child(20)'); // Example start index
            startCell.appendChild(e.target); 
            statusText.innerText = "Unlocked! Roll again.";
            resetDiceForBonus();
            return;
        }

        // 3. MOVING LOGIC (If piece is already out)
        if (lastRoll > 0 && !e.target.parentElement.classList.contains('pocket')) {
            statusText.innerText = "Piece moved " + lastRoll + " spaces!";
            // Here you would add path-following logic
            if (lastRoll === 6) {
                resetDiceForBonus();
            } else {
                nextTurn();
            }
        }
    }
});

function resetDiceForBonus() {
    canRoll = true;
    lastRoll = 0;
    diceBtn.style.opacity = "1";
    diceBtn.style.boxShadow = "0 0 20px white"; // Glow for bonus turn
}

function nextTurn() {
    turnIndex = (turnIndex + 1) % 4;
    diceBtn.style.backgroundColor = players[turnIndex];
    diceBtn.style.opacity = "1";
    diceBtn.style.boxShadow = "none";
    canRoll = true;
    lastRoll = 0;
    statusText.innerText = players[turnIndex].toUpperCase() + "'s Turn";
}
