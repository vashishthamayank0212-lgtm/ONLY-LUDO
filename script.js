const pathContainer = document.getElementById('path-container');

// 1. Create the grid squares (15x15)
for (let i = 0; i < 225; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    // Marking Safe Stops (Calculated indices for Ludo stops)
    const safeIndices = [19, 31, 52, 91, 103, 117, 135, 201];
    if (safeIndices.includes(i)) cell.classList.add('safe-stop');
    
    pathContainer.appendChild(cell);
}

// 2. Put 4 pieces in each home base
const colors = ['red', 'green', 'yellow', 'blue'];
colors.forEach(color => {
    const pockets = document.querySelectorAll(`.${color}-home .pocket`);
    pockets.forEach(pocket => {
        const p = document.createElement('div');
        p.className = 'piece';
        p.style.backgroundColor = color;
        pocket.appendChild(p);
    });
});

// 3. Simple Dice
document.getElementById('roll-btn').addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const faces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    document.getElementById('dice-display').innerText = faces[roll];
    document.getElementById('status').innerText = "You rolled a " + roll + "!";
});
