const container = document.getElementById('cells-container');

// 1. Draw the 225 squares
for (let i = 0; i < 225; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    // Color the "Home Paths"
    if (i >= 106 && i <= 110) cell.style.background = "#ffb3b3"; // Red path
    if (i >= 114 && i <= 118) cell.style.background = "#b3d9ff"; // Blue path
    
    container.appendChild(cell);
}

// 2. Add 4 pieces to each home
const bases = ['red-base', 'green-base', 'yellow-base', 'blue-base'];
bases.forEach(baseId => {
    const base = document.getElementById(baseId);
    for(let i=0; i<4; i++) {
        const p = document.createElement('div');
        p.className = 'piece';
        p.style.backgroundColor = baseId.split('-')[0];
        base.appendChild(p);
    }
});

// 3. Simple Dice Roll
document.getElementById('roll-btn').addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice').innerText = "🎲 Rolled: " + roll;
});
