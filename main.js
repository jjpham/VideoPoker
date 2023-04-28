//This Section Builds the original deck of cards
const suits = ["s", "c", "d", "h"];
const ranks = [
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "J",
    "Q",
    "K",
    "A",
];
const originalDeck = buildOriginalDeck();
function buildOriginalDeck() {
    const deck = [];
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
            let value;
            if (rank === "A") {
                value = 14;
            } else if (rank === "K") {
                value = 13;
            } else if (rank === "Q") {
                value = 12;
            } else if (rank === "J") {
                value = 11;
            } else {
                value = Number(rank);
            }
            deck.push({
                face: `${suit}${rank}`,
                value: value,
            });
        });
    });
    return deck;
}
const betMultiplier = {
    RoyalFlush: 250,
    StraightFlush: 50,
    FourAces: 160,
    RoyalFourOfaKind: 80,
    NumFourOfaKind: 50,
    FullHouse: 9,
    Flush: 7,
    Straight: 5,
    ThreeOfaKind: 3,
    TwoPair: 1,
    RoyalPair: 1,
};
const betArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let tempDeck = [...originalDeck];
const valArr = [];
const handSize = 5;
let hand;
let secondDeal;
let winningHand;
let deal;
let mult;
let betIdx = 0;
let winnings;
let bank;
let bet = 0.25 * betArr[betIdx];

hand = document.getElementsByClassName("card");
document.getElementById("deal").addEventListener("click", dealCards);
document.getElementById("maxBet").addEventListener("click", setMaxBet);
document.getElementById("incBet").addEventListener("click", incBetIdx);

init();
function init() {
    secondDeal = -1;
    winningHand = null;
    bank = 500;
    betIdx = 0;
}
function dealCards() {
    if (secondDeal === -1) {
        valArr.length = 0;
        resetHandRender();
        addCardEvt();
        setHand();
        renderHand();
        renderMessage();
        bank -= bet;
        document.getElementById("bank").innerText = `$${bank}`;
    } else if (secondDeal === 1) {
        addCardEvt();
        setHand();
        renderHand();
        createArr();
        winningHand = getWinningHand(valArr);
        winnings = bet * mult;
        bank += winnings;
        renderMessage(winningHand);
        document.getElementById("bank").innerText = `$${bank}`;
        winningHand = null;
        tempDeck = [...originalDeck];
    }
    secondDeal *= -1;
}
function renderMessage() {
    if (winningHand === null && secondDeal === -1) {
        document.getElementById(
            "winningsWindow"
        ).innerText = `You've bet $${bet}! Click to hold cards!`;
    } else if (winningHand === null && secondDeal === 1) {
        document.getElementById(
            "winningsWindow"
        ).innerText = `Better Luck Next Time!!`;
    } else if (winningHand !== null && secondDeal === 1) {
        document.getElementById(
            "winningsWindow"
        ).innerText = `You've got a ${winningHand} (${mult}x)! You've won $${winnings}!`;
    }
}
function addCardEvt() {
    for (i = 0; i < handSize; i++) {
        if (secondDeal === -1) {
            hand[i].addEventListener("click", addChgCard);
        } else if (secondDeal === 1) {
            hand[i].removeEventListener("click", addChgCard);
            hand[i].style.boxShadow = "none";
        }
    }
}
function addChgCard() {
    if (this.chgCard) {
        this.chgCard = null;
        this.style.boxShadow = "none";
    } else {
        this.chgCard = 1;
        this.style.boxShadow = "5px 5px gray";
    }
}
function setHand() {
    for (let i = 0; i < handSize; i++) {
        if (secondDeal === -1) {
            hand[i].card = getNewCard();
        } else if (secondDeal === 1) {
            if (hand[i].chgCard === null) {
                hand[i].card = getNewCard();
                hand[i].className = "card";
                hand[i].classList.add(hand[i]["card"][0]["face"]);
            }
        }
    }
}
function resetHandRender() {
    for (let i = 0; i < handSize; i++) {
        hand[i].className = "card";
        hand[i].chgCard = null;
    }
}
function renderHand() {
    for (let i = 0; i < handSize; i++) {
        hand[i].classList.add(hand[i]["card"][0]["face"]);
    }
}
function getNewCard() {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    return tempDeck.splice(rndIdx, 1);
}
function passByValue(x) {
    let val = x;
    return val;
}
function createArr() {
    for (i = 0; i < handSize; i++) {
        valArr.push(passByValue(hand[i]["card"][0]["value"]));
    }
}

function getWinningHand(arr) {
    if (containsRoyalFlush(arr)) {
        winningHand = "Royal Flush";
        if(betIdx === betArr.length-1){
            winningHand = "Royal Flush with the Max Bet"
            mult = 750;
        }
        else{
        mult = betMultiplier.RoyalFlush;}
    } else if (containsStraightFlush(arr)) {
        winningHand = "Straight Flush";
        mult = betMultiplier.StraightFlush;
    } else if (containsFourAces(arr)) {
        winningHand = "Four Aces";
        mult = betMultiplier.FourAces;
    } else if (containsRoyalFourOfaKind(arr)) {
        winningHand = "Royal Four Of a Kind";
        mult = betMultiplier.RoyalFourOfaKind;
    } else if (containsNumFourOfaKind(arr)) {
        winningHand = "Four Of a Kind";
        mult = betMultiplier.NumFourOfaKind;
    } else if (containsFullHouse(arr)) {
        winningHand = "Full House";
        mult = betMultiplier.FullHouse;
    } else if (containsFlush()) {
        winningHand = "Flush";
        mult = betMultiplier.Flush;
    } else if (containsStraight(arr)) {
        winningHand = "Straight";
        mult = betMultiplier.Straight;
    } else if (containsThreeOfaKind(arr)) {
        winningHand = "Three Of a Kind";
        mult = betMultiplier.ThreeOfaKind;
    } else if (containsTwoPair(arr)) {
        winningHand = "Two Pair";
        mult = betMultiplier.TwoPair;
    } else if (containsRoyalPair(arr)) {
        winningHand = "Royal Pair";
        mult = betMultiplier.RoyalPair;
    } else {
        winningHand = null;
        mult = 0;
    }
    return winningHand;
}
function containsRoyalFlush(arr) {
    let valSum;
    if (containsFlush(arr)) {
        for (let x = 0; x < handSize; x++) {
            valSum += arr[x];
        }
        if (valSum === 60) {
            return true;
        }
    } else {
        return false;
    }
}
function containsStraightFlush(arr) {
    if (containsFlush() && containsStraight(arr)) {
        return true;
    }
    return false;
}
function containsFlush() {
    let suit = hand[0]["card"][0]["face"].charAt(0);
    for (let i = 0; i < handSize; i++) {
        if (hand[i]["card"][0]["face"].charAt(0) !== suit) {
            return false;
        }
    }
    return true;
}
function containsStraight(arr) {
    let tempVal;
    if (arr.includes(14)) {
        arr.push(1);
    }
    let highStraight = true;
    let lowStraight = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 14) {
            hasAce = true;
        }
        tempVal = arr[i];
        let j = i + 1;
        for (; j < arr.length; j++) {
            if (arr[j] > tempVal) {
                tempVal = arr[j];
                arr[j] = arr[i];
                arr[i] = tempVal;
            }
        }
    }
    for (let i = 1; i < handSize; i++) {
        tempVal = arr[i - 1];
        if (tempVal != arr[i] + 1) {
            highStraight = false;
        }
    }
    if (arr.includes(14)) {
        for (let i = arr.length - 2; i > 0; i--) {
            tempVal = arr[i + 1];
            if (tempVal != arr[i] - 1) {
                lowStraight = false;
            }
        }
        if (lowStraight || highStraight) {
            return true;
        } else {
            return false;
        }
    }
    return highStraight;
}
function containsFourOfaKind(arr) {
    let fourNum = 0;
    let hasPair = false;
    let hasTrip = false;
    let hasFour = false;
    let currentPair = 0;
    let tempVal;
    for (let i = 0; i < handSize; i++) {
        tempVal = arr[i];
        let j = i + 1;
        for (; j < handSize; j++) {
            if (arr[j] === tempVal && !hasPair) {
                hasPair = true;
                currentPair = arr[j];
            } else if (arr[j] === currentPair && hasPair && !hasTrip) {
                hasTrip = true;
            } else if (arr[j] === currentPair && hasTrip) {
                hasFour = true;
                fourNum = arr[j];
            }
        }
        currentPair = 0;
    }
    return fourNum;
}
function containsFourAces(arr) {
    if (containsFourOfaKind(arr) === 14) {
        return true;
    } else {
        return false;
    }
}
function containsRoyalFourOfaKind(arr) {
    if (containsFourOfaKind(arr) > 10 && containsFourOfaKind(arr) < 14) {
        return true;
    } else {
        return false;
    }
}
function containsNumFourOfaKind(arr) {
    if (containsFourOfaKind(arr) > 0 && containsFourOfaKind(arr) < 11) {
        return true;
    } else {
        return false;
    }
}
function containsFullHouse(arr) {
    if (containsThreeOfaKind(arr) && containsTwoPair(arr)) {
        return true;
    }
    return false;
}
function containsThreeOfaKind(arr) {
    let hasPair = false;
    let currentPair;
    let tempVal;
    for (let i = 0; i < handSize; i++) {
        tempVal = arr[i];
        let j = i + 1;
        for (; j < handSize; j++) {
            if (arr[j] === tempVal && !hasPair) {
                hasPair = true;
                currentPair = arr[j];
            } else if (arr[j] === currentPair && hasPair) {
                return true;
            } else if (arr[j] === tempVal) {
                currentPair = arr[j];
            }
        }
        currentPair = 0;
    }
    return false;
}
function containsTwoPair(arr) {
    let hasPair = false;
    let currentPair;
    let tempVal;
    let matchArr = [];
    for (let i = 0; i < handSize; i++) {
        tempVal = arr[i];
        let j = i + 1;
        for (; j < handSize; j++) {
            if (arr[j] === tempVal && arr[j] !== currentPair) {
                if (!matchArr.includes(arr[j])) {
                    matchArr.push(arr[j]);
                }
                if (!hasPair) {
                    hasPair = true;
                    currentPair = arr[j];
                } else if (hasPair && matchArr.length === 2) {
                    return true;
                }
            }
        }

        currentPair = null;
    }
    return false;
}
function containsRoyalPair(arr) {
    let tempVal;
    for (let i = 0; i < handSize; i++) {
        tempVal = arr[i];
        let j = i + 1;
        for (; j < handSize; j++) {
            if (arr[j] === tempVal && arr[j] > 10) {
                return true;
            }
        }
    }
    return false;
}
function setMaxBet() {
    betIdx = betArr.length - 1;
    bet = 0.25 * betArr[betIdx];
    document.getElementById("betAmnt").innerText = `$${bet}`;
}
function incBetIdx() {
    if (betIdx === betArr.length - 1) {
        betIdx = 0;
    } else {
        betIdx += 1;
    }
    bet = 0.25 * betArr[betIdx];
    document.getElementById("betAmnt").innerText = `$${bet}`;
}
