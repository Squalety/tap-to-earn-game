let energy = 10;
let points = 0;

document.getElementById('tapButton').addEventListener('click', function() {
    if (energy > 0) {
        points++;
        energy--;
        updateEnergy();
        updatePoints();
    } else {
        alert('Недостаточно энергии! Подождите, чтобы восстановиться.');
    }
});

function updateEnergy() {
    document.getElementById('energy').textContent = energy;
}

function updatePoints() {
    document.getElementById('points').textContent = points;
}

// Восстановление энергии со временем (например, +1 энергия каждые 10 секунд)
setInterval(function() {
    if (energy < 10) {
        energy++;
        updateEnergy();
    }
}, 500); // Измените интервал при необходимости
