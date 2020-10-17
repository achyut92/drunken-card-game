let { distributeCards,
    rankPlayers,
    winners,
    tieBreaker } = require('./play');

let Player = require('./player');
let playerCount = 4;
let players = [];

for (let i = 0; i < playerCount; i++) {
    let player = new Player(`P${i + 1}`, [], 0);
    players.push(player)
}

let distributedCards = distributeCards(playerCount, [], players);

let playersRank = rankPlayers(playerCount, players);

let winnersList = winners(playerCount, players);

if (winnersList.length == 1) {
    console.log(`We have a winner : Its Player  ${players[winnersList[0]].name}`);
    return;
}
else {
    console.log("We have a tie between the following players :");
    winnersList.forEach(winner => {
        console.log(players[winner].name);
    })
    console.log("Lets wait and watch the Tie breaker");
}

// Play tie break with remaining cards.
tieBreaker(winnersList, distributedCards.remainingCards, remainingCardsCount, 0, players);