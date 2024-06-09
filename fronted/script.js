function sendScoreToBackend(score) {
    fetch('squalety-tap-to-earn-game-6d76.twc1.net/submit-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: score }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function fetchLeaderboard() {
    fetch('squalety-tap-to-earn-game-6d76.twc1.net/leaderboard')
        .then(response => response.json())
        .then(data => {
            let scoreboard = document.getElementById('scoreboard');
            scoreboard.innerHTML = '<h2>Leaderboard</h2>';
            data.forEach(user => {
                let entry = document.createElement('div');
                entry.textContent = `${user.username}: ${user.score}`;
                scoreboard.appendChild(entry);
            });
        });
}

document.addEventListener('DOMContentLoaded', fetchLeaderboard);
