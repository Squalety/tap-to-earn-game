const backendUrl = 'squalety-tap-to-earn-game-6d76.twc1.net'; // Замените на фактический URL вашего бэкенда

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

document.getElementById('registerButton').addEventListener('click', async () => {
    const telegramId = document.getElementById('telegramId').value;
    const username = document.getElementById('username').value;

    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegram_id: telegramId, username: username })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('rateButton').addEventListener('click', async () => {
    const telegramId = document.getElementById('telegramId').value;
    const rating = document.getElementById('rating').value;

    const response = await fetch(`${apiUrl}/rate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegram_id: telegramId, rating: rating })
    });

    const data = await response.json();
    alert(data.message);
});