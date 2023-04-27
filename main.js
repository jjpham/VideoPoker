//This Section Builds the original deck of cards
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const originalDeck = buildOriginalDeck();
function buildOriginalDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
        deck.push({
            face: `${suit}${rank}`
        });
        });
    });
    return deck;
}

let tempDeck = [...originalDeck];
const pulledCard = [];
const pulledCardTwo = [];

let hand;
let newCard;
let secondDeal;
let winningHand;
let deal;

hand = document.getElementsByClassName('card');
document.getElementById('deal').addEventListener('click', dealCards);

init();
function init(){
secondDeal = -1;
winningHand = null;
}

function addCardEvt(){
    for (i = 0; i < hand.length; i++){
        if(secondDeal === -1){
            hand[i].addEventListener("click",addChgCard);
            console.log('Add Eventlistener FromCard');
        }
        else if(secondDeal === 1){
            hand[i].removeEventListener("click", addChgCard);
            console.log('Remove Eventlistener FromCard');
            }
        }
}
function addChgCard(){
    if(this.chgCard){this.chgCard = null;}
    else{this.chgCard = 1;}
    console.log(this.chgCard);
    console.log(this.card);
}

function dealCards(){
    console.log(secondDeal);
    if(secondDeal === -1){
        resetHandRender();
        addCardEvt();
        setHand();
        renderHand();
    }
    else if(secondDeal === 1){
        addCardEvt();
        setHand();
        renderHand();
        tempDeck = [...originalDeck];
    }
    secondDeal *= -1;
}
function setHand(){

    for(let i = 0; i <hand.length; i++){
        if(secondDeal === -1){
        hand[i].card = getNewCard();
        }
        else if(secondDeal ===1){
            if(hand[i].chgCard === null){
                hand[i].card = getNewCard();
                hand[i].className = 'card';
                hand[i].classList.add(hand[i]['card'][0]['face']);
            }
        }
    } 
}
function resetHandRender(){
    for(let i = 0; i < hand.length; i++){
        hand[i].className = 'card';
        hand[i].chgCard = null;
    }
}
function renderHand(){
    for(let i = 0; i < hand.length; i++){
        hand[i].classList.add(hand[i]['card'][0]['face']);
    }
}
//This line should be in a function
//const playerHand = document.getElementById('chgCard');
function getNewCard(){
        const rndIdx = Math.floor(Math.random()*tempDeck.length);
        //concern here is the [0] index review if their is a bug
        return tempDeck.splice(rndIdx, 1);
}



