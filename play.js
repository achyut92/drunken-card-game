function distributeCards(playerCount, remainingCards, players) {
    let shuffledCards = shuffleCards();
    let finishIdx = 0;

    for (let i = 0; i < playerCount; i++) {
        let cards = [];
        let startIdx = (i * 3);
        cards[0] = ((shuffledCards[startIdx]) % 13) + 1;
        cards[1] = ((shuffledCards[startIdx + 1]) % 13) + 1;
        cards[2] = ((shuffledCards[startIdx + 2]) % 13) + 1;

        cards.sort();

        console.log(`Player ${players[i].name} cards : ${cards}`);
        players[i].cards = cards;
        finishIdx = i;
    }

    let remainStartIdx = finishIdx * 3;
    for (let i = 0; i < 52; i++) {
        if (remainStartIdx < 52) {
            remainingCards[i] = (shuffledCards[remainStartIdx]);
            remainStartIdx++;
        }
        else {
            remainingCards[i] = -1;
        }
    }
    return { remainingCards };
}

function rankPlayers(playerCount, players) {
    let playersRank = [];

    for (let i = 0; i < playerCount; i++) {
        // var cards = playersCards[i];
        var cards = players[i].cards;

        // ALL same
        if (((cards[0] + cards[1] + cards[2]) % cards[0] == 0) && ((cards[0] + cards[1] + cards[2]) / cards[0] == 3)) {
            players[i].rank = 1;
            continue;
        }

        // sequence
        if ((cards[2] == cards[0] + 2) && (cards[1] == cards[0] + 1)) {
            players[i].rank = 2;
            continue;
        }

        //Two equal
        if ((cards[0] == cards[1]) || (cards[1] == cards[2])) {
            players[i].rank = 3;
            continue;
        }

        //No special combination. Take the highest card.
        players[i].rank = 4;
    }

    console.log("Ranking of the players are: ");
    for (let i = 0; i < playerCount; i++) {
        console.log(players[i].name + " : " + players[i].rank);
    }

    return playersRank;
}

function winners(playerCount, players) {

    let highestRank = 0;
    let winnersList = [];

    for (let i = 0; i < playerCount; i++) {
        if (i == 0) {
            highestRank = players[i].rank;
            winnersList.push(i);
        }
        else {
            if (players[i].rank == highestRank) {
                winnersList.push(i);
            }
            else if (players[i].rank < highestRank) {
                winnersList = [];
                winnersList.push(i);
                highestRank = players[i].rank;
            }
        }
    }

    if (highestRank == 4 && winnersList.length > 1) {
        let topCardVal = 0;
        let topCardWinnersList = [];

        for (let i = 0; i < winnersList.length; i++) {
            if (i == 0) {
                topCardVal = players[winnersList[i]].cards[2];
                topCardWinnersList.push(winnersList[i]);
            }
            else {
                if (players[winnersList[i]].cards[2] == topCardVal) {
                    topCardWinnersList.push(winnersList[i]);
                }
                else if (players[winnersList[i]].cards[2] > topCardVal) {
                    topCardVal = players[winnersList[i]].cards[2];
                    topCardWinnersList = [];
                    topCardWinnersList.push(winnersList[i]);
                }
            }
        }
        console.log('Top card value:', topCardVal);
        return topCardWinnersList;
    }

    return winnersList;
}

function tieBreaker(winnersList, remainingCards, remainingCardsCount, remainingCardsStartIndex, playersName) {
    let newWinnersList = [];
    var newHighest = 0;

    if (remainingCardsCount < winnersList.length || remainingCardsStartIndex + winnersList.length > remainingCardsCount) {

        remainingCards = shuffleCards();
        remainingCardsCount = 52;
        tieBreaker(winnersList, remainingCards, remainingCardsCount, 0, playersName);
    }

    for (let i = 0; i < winnersList.length; i++) {
        if (i == 0) {
            newHighest = (remainingCards[i] % 13) + 1;
            newWinnersList.push(winnersList[i]);
        }
        else {
            if (((remainingCards[i] % 13) + 1) > newHighest) {
                newHighest = (remainingCards[i] % 13) + 1;
                newWinnersList = [];
                newWinnersList.push(winnersList[i]);
            }
            else if (((remainingCards[i] % 13) + 1) == newHighest) {
                newWinnersList.push(winnersList[i]);
            }
        }

    }

    if (newWinnersList.length == 1) {
        console.log(`We have a winner to the Tie breaker and the Game: It's Player ${playersName[newWinnersList[0]].name}`);
    }
    else {
        tieBreaker(newWinnersList, remainingCards, remainingCardsCount, remainingCardsStartIndex + winnersList.length, playersName);
    }

    return;

}

function shuffleCards() {
    let randomNumbers = [];

    console.log("Shuffling the cards to everyone");
    do {
        let num = getRandomInt(1, 52);
        if (!randomNumbers.includes(num)) {
            randomNumbers.push(num);
        }

    } while (randomNumbers.length < 52);

    return randomNumbers;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    distributeCards,
    rankPlayers,
    winners,
    tieBreaker
}