## Functionality
As a user...
-   I want to be able to make bets on the hands that I pick
-   I want to be able to change my bet
-   I want to hold certain cards as the program deals another set of cards
-   I want to get paid out based on the hands that I am dealt
-   I want to see how much money I have and how much I've won on screen
-   I want to continuously play that game without pausing for every annoucement
-   I want to see the winning multipliers



Bonus use stories
-   I want to see the money count up
-   I would also like the ability to skip the above function
-   I want to gain extra win bonuses for hitting 4 aces
-   I want to be able to toggle the winning mulitpliers
-   I want to be able to add a double function
-   I want to see the money count up for big wins

## Design
-   Black and Gold design
-   White cards 
-   Winning Multiplier show for each hand

## Wireframe the UI
<https://miro.com/app/board/uXjVMPjupek=/?share_link_id=83205964976>
## Pseudocode
1)  Define required constants
    1)  Originial Deck: length = 52 [][(Suits - shapes for each card), (Values - 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A)]
    3)  Multipliers for each hand - [][] Jack or better pair 1x, two pair 1x, 3 of a kind 3x, straight 5x, flush 7x, full house 9x, 2 - 10 4 of a kind  50x, J Q K 4 of a kind 80x, 4 Aces 160x, Straight flush 50x, Royal Flush 250x, Royal Flush + 5 bet 4000x
    4)  Current hand being displayed [][]
    5)  Cards taken out temporarily [][]
    6)  Hand Size = 5

2) Define required variables used to track the state of the game
    1) Second Deal -1 || 1
    2) Bet amount 1, 2, 3, 4, 5
    3) Cash Amount

3) Cache DOM Elements
    1) Message board
    2) Cash Amount
    3) Deal button
    4) Cards
    5) Bet Mechanics

4) Upon Loading the App
    Beginning
        1)  Display the backs of the cards
        2)  Have the cash amount set at $500.00
        3)  Have the Second Deal already on 1
        4)  Bet size $.25 1x
    Start
        1)  Upon the first Deal button being clicked obtain a random suit and value from the Original Deck and add it to the [][] hand and [][]temp cards . Change the Second Deal to -1
        2)  Do this 4 more times
        3) Render the cards by adding the Value and Suite classes to each div/card

    Second Deal
        1)  For each card not clicked on "Held"/with the class "Discard" replace it with another value from the original deck
        2) Add those cards to the hand and the cards taken out [][]
        3) Display new cards 

    Check Hand:
        1) Call containsFlush 
            2) Call containsStraghtFlush
            3) Call containsRoaylFlush
        4) Call containsPair
            5) Call containsTwoPair
            6) Call containsThreeOfaKind
            7) Call contansStraight
            8) Call containsFullHouse
            9) Call containsFourOfaKind

    End of Turn:
        1)  Display Winning Hands name: and bet size x multiplier (Winnings)
        2) Add winnings to the cash amount
        3) Push the temp Cards back into Original deck
        4) Change Second Deal to -1
