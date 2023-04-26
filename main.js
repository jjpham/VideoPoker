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


const tempDeck = [...originalDeck];
const pulledCard = [];

let hand;
let newCard;
let secondDeal;
let winningHand;

//document.getElementById('cardContainer').addEventListener("click", handleDrop);
hand = document.getElementsByClassName('card');

init();
function init(){
//hand = new Array(5).fill(null);
secondDeal = -1;
winningHand = null;
render();
}


function addCardEvt(){
    for (i = 0; i < hand.length; i++){
        if(secondDeal === -1){
            hand[i].addEventListener("click",addChgCard);}
        else if(secondDeal === 1){
            hand[i].removeEventListener("click", addChgCard);}
        }

}
function addChgCard(){
    if(this.chgCard){
        this.chgCard = null;
    }
    else{
    this.chgCard = 1;
    }
    
    // console.log(hand);
    //  console.log(this);
    console.log(this.chgCard);
    console.log(this.card);
}


function render(){
    if(secondDeal === -1){
        setFirstHand();
        addCardEvt();
    }
    else if(secondDeal === 1){
        addCardEvt();
        
    }
}
function setFirstHand(){
    for(i = 0; i <hand.length; i++){
        hand[i].card = getNewCard();
    }
    
}
//This line should be in a function
//const playerHand = document.getElementById('chgCard');
function getNewCard(){
        const rndIdx = Math.floor(Math.random()*tempDeck.length);
        //concern here is the [0] index review if their is a bug
        return tempDeck.splice(rndIdx, 1);
}



