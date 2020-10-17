let { distributeCards } = require('./play');

let Player = require('./player');
let playerCount = 4;
let players = [];

for (let i = 0; i < playerCount; i++) {
    let player = new Player(`P${i + 1}`, [], 0);
    players.push(player)
}

let distributedCards = distributeCards(playerCount, [], players);