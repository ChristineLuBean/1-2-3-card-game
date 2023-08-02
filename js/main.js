/**
 * Sets up the new game button. Removes the click event listener for drawing cards,
 * changes the button text to 'New Game', and adds the click event listener for shuffling the deck.
 */
function newGameButton() {
  const button = document.querySelector('button')
  button.removeEventListener('click', drawCards)
  button.textContent = 'New Game'
  button.addEventListener('click', shuffleDeck)
}

/**
 * Sets up the draw button. Removes the click event listener for shuffling the deck,
 * changes the button text to 'Draw Cards', and adds the click event listener for drawing cards.
 */
function drawButton() {
  const button = document.querySelector('button')
  button.removeEventListener('click', shuffleDeck)
  button.textContent = 'Draw Cards'
  button.addEventListener('click', drawCards)
}

/**
 * Shuffles the deck by making a fetch request to the card API.
 * Clears the cards, sets the deck ID and remaining cards in local storage,
 * sets the player scores to 0, loads the scores, and updates the button to be the draw button.
 */
function shuffleDeck() {
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
      clearCards()
      localStorage.setItem('deckId', data.deck_id)
      localStorage.setItem('remainingCards', data.remaining)
      localStorage.setItem('player1Score', 0)
      localStorage.setItem('player2Score', 0)
      loadScores()
      drawButton()
  })
  .catch(err => {
    console.error(`error ${err}`)
  });
}

/**
 * Compares the values of the drawn cards and determines the round winner.
 * Updates the round winner score.
 * @param {object} data - The response data containing the drawn cards.
 */
function compareCards (data) {
  const cardValues = {
    KING: 13,
    QUEEN: 12,
    JACK: 11,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    ACE: 1
  }
  const player1CardValue = cardValues[data.cards[0].value]
  const player2CardValue = cardValues[data.cards[1].value]

  let roundWinner

  if (player1CardValue === player2CardValue) {
    roundWinner = 'tie'
  } else if (player1CardValue > player2CardValue) {
    roundWinner = 'player1'
    addPoint(roundWinner)
  } else {
    roundWinner = 'player2'
    addPoint(roundWinner)
  }
}

/**
 * Adds a point to the round winner's score.
 * @param {string} roundWinner - The winner of the round ('player1' or 'player2').
 */
function addPoint(roundWinner) {
  let player1Score = parseInt(localStorage.getItem('player1Score'))
  let player2Score = parseInt(localStorage.getItem('player2Score'))

  roundWinner === 'player1' ? player1Score++ : player2Score++

  localStorage.setItem('player1Score', player1Score)
  localStorage.setItem('player2Score', player2Score)
}

/**
 * Loads the player scores from local storage and updates the score elements on the page.
 */
function loadScores() {
  const player1ScoreElement = document.querySelector('#player-1-score')
  const player2ScoreElement = document.querySelector('#player-2-score')

  const player1Score = localStorage.getItem('player1Score')
  const player2Score = localStorage.getItem('player2Score')

  player1ScoreElement.textContent = player1Score
  player2ScoreElement.textContent = player2Score
}

/**
 * Announces the winner based on player scores stored in localStorage.
 */
function announceWinner() {
  const score1 = Number(localStorage.getItem('player1Score'))
  const score2 = Number(localStorage.getItem('player2Score'))

  const result = score1 === score2 ? "It's a tie!" : score1 > score2 ? 'Player 1 wins!' : 'Player 2 wins!'
  alert(result)
}

/**
 * Draws two cards from the deck and performs necessary actions based on the result.
 */
function drawCards() {
  const deckId = localStorage.getItem('deckId');
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.remaining !== 0) {
          compareCards(data)
          loadCards(data)
          loadScores()
          localStorage.setItem('remainingCards', data.remaining)
        } else {
          announceWinner()
          clearCards()
          newGameButton()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

/**
 * Loads the player images from the data object and stores them in localStorage.
 * Also updates the player image elements in the HTML.
 *
 * @param {object} data - The data object containing the player card images.
 */
function loadCards(data) {
  const player1Image = data.cards[0].image
  const player2Image = data.cards[1].image
  localStorage.setItem('player1-image', player1Image)
  localStorage.setItem('player2-image', player2Image)
  document.querySelector('#player-1').src = player1Image
  document.querySelector('#player-2').src = player2Image
}

/**
 * Preloads the player images from localStorage and updates the player image elements in the HTML.
 */
function preloadCards() {
  const player1Image = localStorage.getItem('player1-image')
  const player2Image = localStorage.getItem('player2-image')
  document.querySelector('#player-1').src = player1Image
  document.querySelector('#player-2').src = player2Image
  loadScores()
}

/**
 * Clears the player cards by setting the image source to a default back image.
 */
function clearCards() {
  const playerImage = 'https://www.deckofcardsapi.com/static/img/back.png'
  document.querySelector('#player-1').src = playerImage
  document.querySelector('#player-2').src = playerImage
}

// Check if necessary data is present in localStorage, and show appropriate buttons and images.
if (!localStorage.getItem('deckId') || !localStorage.getItem('remainingCards') || localStorage.getItem('remainingCards') === 0) {
  newGameButton()
} else {
  preloadCards()
  drawButton()
}
