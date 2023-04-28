## Video Poker
Code Description:
    This is a game that mimics poker. It has a betting function that will increment an additional $.25 every time
    "bet + 1" button is pushed, with a max bet of $2.5 per hand. It features a message board that will display how much
    was bet on the hand, how much was won, and how it was won. From there, there is a bank box that displays how much is left
    in the bank roll. It starts off with $500.
    The poker hands function based on the "Deal" button being clicked. There is a distinction between the second time it is clicked
    and the first time. The first time it is clicked it will display the original set of cards and subtract the bet from the bank.
    Then the second time, it will replace any cards that weren't clicked with another set of random cards to obtain the final hand. 
    From there, the hand will be read for winninghands, display on the messageboard, and add winnings to the bankroll.

## Initial Game Screen
<img src = "https://i.imgur.com/Li4vzoB.png">

## After First Deal Game Screen
<img src = "https://i.imgur.com/cVP3v6j.png">

## After Second Deal Game Screen
<img src = "https://i.imgur.com/hr3VvZ6.png">

## Resources/Technologies Used
-   HTML
-   Javascript
-   CSS
-   General Assmebly Card CSS Library
-   free rawpixel png for cloud background in buttons (edited) "https://www.rawpixel.com/image/6576111/png-cloud-sticker"
-   google fonts for the fonts use in top of the body and messages
-   img from my trip in Vietnam for the body background img

## Getting Started
-   Adjust the bet by clicking the "Bet + 1" button to increment another $.25
-   Or click "Max Bet" button to set bet to $2.50
-   Click the "Deal" button to show your first set of randomly generated cards
-   Click on the cards that you wish to keep
-   Click the "Deal" button a second time to replace cards not kept
-   Your winnings will display if won, otherwise adjust the bet before clicking "Deal" again. 
    To do so, click "Bet + 1" until your desired bet amount

## Game Objective
-   Win more money/bets by selecting cards that will either get you a higher multiplier or break even
-   Pairs of J,Q,K,A and Two Pairs of any card value will let you break even
-   Follow poker hand cards Royal Flush > Straight Flush > Four Aces > Face Card Four of a Kind > 2 - 10 Four of a Kind >
    Full House (Three of a Kind and a Pair) > Flush > Straight > Three of a Kind > Two Pair > Pair
-   The better the hand the higher the multiplier
-   If you get a Royal Flush on the max bet, you get the multiplier of 750x
-   Lastly, have fun!!!

## Future Improvements
-   add a toggle menu to show the winning hands
-   record leaderboards based highest ending bank roll after 30 minutes
-   incorporate pay function to add more money
-   add a daily free coins function


