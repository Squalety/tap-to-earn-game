const backendUrl = 'https://squalety-tap-to-earn-game-8bab.twc1.net/'; // Замените на фактический URL вашего бэкенда

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

// Функция для регистрации пользователя
function registerUser(userData) {
    fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Функция для отправки оценки
function rateGame(ratingData) {
    fetch(`${backendUrl}/rate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Пример использования функций
const userData = { telegram_id: '123456', username: 'user123' };
registerUser(userData);

const ratingData = { telegram_id: '123456', rating: 5 };
rateGame(ratingData);
