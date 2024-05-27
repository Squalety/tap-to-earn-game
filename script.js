document.addEventListener('DOMContentLoaded', () => {
    const pointsDisplay = document.getElementById('points');
    const energyDisplay = document.getElementById('energy');
    const tapButton = document.getElementById('tap-button');

    let points = 0;
    let energy = 10;
    const maxEnergy = 10;
    const energyRestoreRate = 500; // milliseconds
    const energyRestoreAmount = 1;

    function updateDisplays() {
        pointsDisplay.textContent = points;
        energyDisplay.textContent = energy;
        tapButton.disabled = energy <= 0;
    }

    tapButton.addEventListener('click', () => {
        if (energy > 0) {
            points++;
            energy--;
            updateDisplays();
        }
    });

    setInterval(() => {
        if (energy < maxEnergy) {
            energy += energyRestoreAmount;
            if (energy > maxEnergy) {
                energy = maxEnergy;
            }
            updateDisplays();
        }
    }, energyRestoreRate);

    updateDisplays();
});
