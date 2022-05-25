'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentPl0 = document.getElementById('current--0');
const currentPl1 = document.getElementById('current--1');

let scores, currentScore, activePlayer, playingState;

const init = function () {
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  playingState = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  currentPl0.textContent = 0;
  currentPl1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //reset the current score!
  currentScore = 0;
  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log(activePlayer);
  // changing the bg color of active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice!
btnRoll.addEventListener('click', function () {
  if (playingState) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1:
    if (dice !== 1) {
      //Add dice current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if player's score is >= 100;
    if (scores[activePlayer] >= 100) {
      //Finish the Game
      playingState = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
