document.addEventListener('DOMContentLoaded', () => {
    const tapButton = document.getElementById('tap-button');
    const scoreDisplay = document.getElementById('score-display');
    let score = 0;

    tapButton.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        // Send score to the backend for storage
        fetch('/update-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: 'example_user_id', score: score }), // Replace with actual user_id
        });
    });

    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {
        // Redirect to Telegram for authentication
        window.location.href = 'https://telegram.me/your_bot_name';
    });

    // Example of fetching scores from the backend
    fetch('/get-scores', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => console.log(data));
});
