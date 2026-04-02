let lastRoll = 0;

// Dice Logic
document.getElementById('roll-btn').addEventListener('click', () => {
    lastRoll = Math.floor(Math.random() * 6) + 1;
    const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    document.getElementById('dice-display').innerText = diceFaces[lastRoll];
    document.getElementById('status').innerText = "Move " + lastRoll + " spaces!";
});

// Movement Logic (Simplified)
// We add a "Click" listener to all pieces
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('piece')) {
        if (lastRoll === 0) {
            alert("Roll the dice first!");
            return;
        }
        
        // This moves the piece visually by adding "Margin"
        // In a real game, we would use a path array, 
        // but for a beginner, this 'jumps' the piece.
        let currentMargin = parseInt(e.target.style.marginLeft) || 0;
        e.target.style.marginLeft = (currentMargin + (lastRoll * 30)) + "px";
        
        document.getElementById('status').innerText = "Piece moved! Next turn.";
        lastRoll = 0; // Reset roll after moving
    }
});

// Setup pieces in bases
const bases = ['red-base', 'green-base', 'blue-base', 'yellow-base'];
bases.forEach(id => {
    const base = document.getElementById(id);
    const p = document.createElement('div');
    p.className = 'piece';
    p.style.backgroundColor = id.split('-')[0]; // Matches piece color to base
    base.appendChild(p);
});
