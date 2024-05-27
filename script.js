let energy = 10;
let points = 0;

function tap() {
    if (energy > 0) {
        points++;
        energy--;
        updateEnergy();
        updatePoints();
    } else {
        alert("Out of energy! Wait for it to restore.");
    }
}

function updateEnergy() {
    document.getElementById("energy").textContent = energy;
}

function updatePoints() {
    document.getElementById("points").textContent = points;
}

// Energy restoration over time (e.g., +1 energy every 10 seconds)
setInterval(function() {
    if (energy < 10) {
        energy++;
        updateEnergy();
    }
}, 500); // Adjust the interval as needed
