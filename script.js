let score = 0;
let energy = 100;
const energyRegenRate = 1; // Energy regeneration rate per second
const energyRegenInterval = 2000; // 1000 milliseconds = 1 second
const energyCostPerClick = 1; // Energy cost for each click

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function updateEnergy() {
    document.getElementById('energy').textContent = energy;
}

function clickEvent() {
    if (energy >= energyCostPerClick) {
        score += 1;
        energy -= energyCostPerClick;
        updateScore();
        updateEnergy();
        toggleImage();
    }
}

function toggleImage() {
    const img = document.getElementById('game-image');
    if (img.src.endsWith('image1.png')) {
        img.src = 'image2.png';
        setTimeout(() => {
            img.src = 'image1.png';
        }, 100); // Change back after half a second
    }
}

function regenerateEnergy() {
    if (energy < 100) {
        energy += energyRegenRate;
        updateEnergy();
    }
    setTimeout(regenerateEnergy, energyRegenInterval);
}

// Start energy regeneration
regenerateEnergy();

// Initial updates
updateScore();
updateEnergy();