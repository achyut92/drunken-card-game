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
    distributeCards
}