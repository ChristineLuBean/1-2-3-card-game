# 1-2-3-card-game

A two-player card game where each player draws one card per round, compares their values, and determines the winner of that round. The game uses the deckofcardsapi.com API for shuffling and drawing cards. Play continues until there are no cards left in the deck.

**Link to project:** https://dashing-biscotti-7ebde7.netlify.app

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

The JavaScript section of the project is responsible for implementing the core functionality of the two-player card game. It performs tasks such as handling button clicks, drawing and comparing cards, updating scores, and announcing the winner. Here's a summary of the key points in the JavaScript section:

1. Frontend Interaction: JavaScript is used to set up the "New Game" and "Draw Cards" buttons by adding event listeners to handle user clicks. Depending on the game state, the buttons' text and functionality are adjusted accordingly.

2. Preloading Images: The preloadCards() function preloads player card images from local storage when the page loads to improve the user experience.

3. API Interaction: The shuffleDeck() function interacts with the deckofcardsapi.com API to shuffle the deck of cards. It fetches the data, stores the deck ID and remaining cards in local storage, and resets the player scores.

4. Drawing Cards: The drawCards() function fetches two cards from the deck using the deck ID and performs actions based on the drawn cards. If no cards are left, it ends the game.

5. Loading Player Cards: The loadCards(data) function loads the player card images from the fetched data and updates the player image elements on the page.

6. Card Comparison: The compareCards(data) function compares the values of two drawn cards and determines the round winner. It updates the scores accordingly and handles ties.

7. Score Management: The addPoint(roundWinner) function increments the score of the round winner and stores the updated scores in local storage. The loadScores() function retrieves the scores from local storage and updates the score elements on the page.

8. Announcing the Winner: When the game ends (no remaining cards), the announceWinner() function checks the stored scores and displays an alert announcing the winner.

Overall, the JavaScript section drives the game mechanics, user interactions, and data management, allowing players to enjoy a seamless card game experience.

## Lessons Learned:

1. Working with APIs: Implementing the card game involved making fetch requests to an external API (deckofcardsapi.com). This experience taught me how to handle API calls, parse response data, and integrate external data into my application.

2. LocalStorage: Utilizing LocalStorage to store data locally allowed me to maintain game state and player scores between rounds and page reloads. It was a great way to persist data without the need for server-side storage.

3. Modular Code: Breaking down the game's functionality into separate functions made the code more organized and easier to maintain. It allowed me to focus on individual tasks and reuse functions where needed.