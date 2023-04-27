//This Section Builds the original deck of cards
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const originalDeck = buildOriginalDeck();
function buildOriginalDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            let value;
            if(rank === 'A'){
                value = 14;
            }
            else if(rank === 'K'){
                value = 13;
            }
            else if(rank ==='Q'){
                value = 12;
            }
            else if(rank ==='J'){
                value = 11;
            }
            else{
                value = Number(rank);
            }
            deck.push({
                face: `${suit}${rank}`,
                value: value
            });
        });
    });
    return deck;
}

let tempDeck = [...originalDeck];
const valArr = [];
const handSize = 5;
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
    for (i = 0; i < handSize; i++){
        if(secondDeal === -1){
            hand[i].addEventListener("click",addChgCard);
        }
        else if(secondDeal === 1){
            hand[i].removeEventListener("click", addChgCard);
            }
        }
}
function addChgCard(){
    if(this.chgCard){this.chgCard = null;}
    else{this.chgCard = 1;}
}

function dealCards(){
    if(secondDeal === -1){
        valArr.length = 0;
        resetHandRender();
        addCardEvt();
        setHand();
        renderHand();
    }
    else if(secondDeal === 1){
        addCardEvt();
        setHand();
        renderHand();
    //   getWinningHand();
        createArr();
        tempDeck = [...originalDeck];
    }
    secondDeal *= -1;
}
function setHand(){
    for(let i = 0; i <handSize; i++){
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
    for(let i = 0; i < handSize; i++){
        hand[i].className = 'card';
        hand[i].chgCard = null;
    }
}
function renderHand(){
    for(let i = 0; i < handSize; i++){
        hand[i].classList.add(hand[i]['card'][0]['face']);
    }
}
function getNewCard(){
        const rndIdx = Math.floor(Math.random()*tempDeck.length);
        //concern here is the [0] index review if their is a bug
        return tempDeck.splice(rndIdx, 1);
}

// getWinningHand(){
//     if(containsRoyalFlush()){}
//     else if(containsStraightFlush()){}
//     else if(containsFourAces()){}
//     else if(containsRoyalFourOfaKind()){}
//     else if(containsNumFourOfaKind()){}
//     else if(containsFullHouse()){}
//     else if(containsFlush()){}
//     else if(containsStraight()){}
//     else if(containsThreeOfaKind()){}
//     else if(containsTwoPair()){}
//     else if(containsRoyalPair()){}
//     else{
//         return winningHand;
//     }
// }
function createArr(){
    for (i = 0; i < handSize; i++){
        valArr.push(passByValue(hand[i]['card'][0]['value']));
    }
}

function passByValue(x){
    let val = x;
    return val;
}
function containsRoyalFlush(arr){
    let suit = hand[0]['card'][0]['face'].charAt(0);
    let valSum;
    for(let x = 0; x < handSize; x++){
        if(hand[x]['card'][0]['face'].charAt(0) !== suit){
            return false;
        }
        valSum += arr[x];
     }
    if(valSum === 60){return true;}
    else{return false;}
}
function containsStraightFlush(arr){
    if(containsFlush() && containsStraight(arr)){
        return true;
    }
    return false;
}
function containsFlush(){
    let suit = hand[0]['card'][0]['face'].charAt(0);
    for(let i = 0; i < handSize; i++){
        if(hand[i]['card'][0]['face'].charAt(0) !== suit){
            return false;
        }
    }
    return true;
}
function containsStraight(arr){
    let tempVal;
     if(arr.includes(14)){
        arr.push(1);
     }
     let highStraight = true;
     let lowStraight =true;
    for(let i = 0; i < arr.length; i ++){
        if(arr[i] === 14){
            hasAce = true;
        }
        tempVal = arr[i];
        let j = i + 1;
        for(; j < arr.length; j++){
            if(arr[j] > tempVal){
                tempVal = arr [j];
                arr[j] = arr[i];
                arr[i] = tempVal;
            }
        }
    }
    for (let i = 1; i < handSize; i++){
        tempVal = arr[i -1];
        if(tempVal != arr[i]+1){
            highStraight = false;
        }
    }
    for(let i = arr.length -2; i > 0; i--){
        tempVal = arr[i + 1];
        if(tempVal != arr[i] -1){
          lowStraight = false;
        }
    }
      if(lowStraight || highStraight){
        return true;
      }
   else {return false;}
}
function containsFourOfaKind(arr){
    let fourNum = 0;
    let hasPair = false;
    let hasTrip = false;
    let hasFour = false;
    let currentPair = 0;
    let tempVal;
    for( let i = 0; i < handSize; i++){
        tempVal = arr[i];
        let j = i + 1;
        for(;j<handSize;j++){
                if(arr[j] === tempVal && !hasPair){
                    hasPair = true;
                    currentPair = arr[j];
                }
                else if(arr[j] === currentPair && hasPair && !hasTrip){
                    hasTrip= true;
                }
                else if(arr[j] === currentPair && hasTrip){
                    hasFour = true;
                    fourNum = arr[j];
                }
        }
        currentPair = 0;
    }
    console.log(`This is the four value${fourNum}`);
    return fourNum;
}
function containsFourAces(arr){
    if(containsFourOfaKind(arr)=== 14){
        return true;
    }
    else{
        return false;
    }
}
function containsRoyalFourOfaKind(arr){
    if(containsFourOfaKind(arr) > 10 && containsFourOfaKind(arr) < 14){
        return true;
    }
    else{
        return false;
    }
}
function containsNumFourOfaKind(arr){
    if(containsFourOfaKind(arr) > 0 && containsFourOfaKind(arr) < 11){
        return true;
    }
    else{
        return false;
    }
}