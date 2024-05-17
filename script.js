let score = 0;
let energy = 100;
const energyRegenRate = 1; // Energy regeneration rate per second
const energyRegenInterval = 2000; // 1000 milliseconds = 1 second
const energyCostPerClick = 1; // Energy cost for each click


const TOKEN = process.env.TELEGRAM_TOKEN || '7035157659:AAEQ5eululduC-HxHsAFz1Dgi-1S5hj7cq4';
const gameName = process.env.TELEGRAM_GAMENAME || 'pizzacat pizzacat';
let url = process.env.URL || 'https://squalety.github.io/pizzacatsol_bot/';
const port = process.env.PORT || 8080;


// название игры (то, что указывали в BotFather)
const gameName = "PizzaCat"


const TelegramBot = require('../..');
const express = require('express');
const path = require('path');

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

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

if (url === '0') {
  const ngrok = require('ngrok');
  ngrok.connect(port, function onConnect(error, u) {
    if (error) throw error;
    url = u;
    console.log(`Game tunneled at ${url}`);
  });
}


app.set('view engine', 'ejs');
// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url });
});

// Render the HTML game
app.get('/', function requestListener(req, res) {
  res.sendFile(path.join(__dirname, 'game.html'));
});

// Bind server to port
app.listen(port, function listen() {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Start energy regeneration
regenerateEnergy();

// Initial updates
updateScore();
updateEnergy();