// 1. Setup the Board Path
const board = document.getElementById('board');

// Create 225 squares (15x15) but skip the areas where 'Homes' already exist
for (let i = 0; i < 225; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    board.appendChild(cell);
}

// 2. Dice Rolling Logic
const rollBtn = document.getElementById('roll-btn');
const diceDisplay = document.getElementById('dice-display');
const statusText = document.getElementById('status');

rollBtn.addEventListener('click', () => {
    // Animation effect
    diceDisplay.style.transform = "rotate(360deg)";
    statusText.innerText = "Rolling...";
    
    setTimeout(() => {
        const roll = Math.floor(Math.random() * 6) + 1;
        
        // Change the Emoji based on the roll
        const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        diceDisplay.innerText = diceFaces[roll];
        diceDisplay.style.transform = "rotate(0deg)";
        
        statusText.innerText = "You rolled a " + roll + "!";
        
        if(roll === 6) {
            statusText.innerText += " - EXTRA TURN!";
        }
    }, 400);
});

// 3. Add Pieces to the Bases
const bases = ['red-base', 'green-base', 'blue-base', 'yellow-base'];
bases.forEach(id => {
    const base = document.getElementById(id);
    const p = document.createElement('div');
    p.className = 'piece';
    base.appendChild(p);
});
