document.addEventListener('DOMContentLoaded', () => {
    const tapButton = document.getElementById('tap-button');
    const scoreDisplay = document.getElementById('score-display');
    let score = 0;

    tapButton.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        // Send score to the backend for storage
        // fetch('/update-score', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ score: score }),
        // });
    });

    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {
        // Redirect to Telegram for authentication
        window.location.href = 'https://telegram.me/TapToEarnGameBot';
    });
});
