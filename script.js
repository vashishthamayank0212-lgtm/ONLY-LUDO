const board = document.getElementById('board');

// This creates exactly 225 squares for the 15x15 grid
for (let i = 0; i < 225; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    board.appendChild(cell);
}

// Dice Logic
const rollBtn = document.getElementById('roll-btn');
const diceDisplay = document.getElementById('dice-display');
const statusText = document.getElementById('status');

rollBtn.addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    diceDisplay.innerText = diceFaces[roll];
    statusText.innerText = "You rolled a " + roll;
});

// Add Pieces to the Bases
const bases = ['red-base', 'green-base', 'blue-base', 'yellow-base'];
bases.forEach(id => {
    const base = document.getElementById(id);
    const p = document.createElement('div');
    p.className = 'piece';
    base.appendChild(p);
});
