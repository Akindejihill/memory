//initialize variables for html elements
let gameContainer = null;  //the div containing the game
let scoreDisplay = null;   //the div displaying the score
let bScoreDisplay = null;  //the div displaying the best score
let playAgain = null;      //the play again button

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let selected = []; //contains no more tha two cards that have been selected.
let score = 0;     //score increases every match attempt
let bestScore = 0; 
let matches = 0;   //keeps track of successful matches


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    newDiv.classList.add("card");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


//gameOver gets called after all matches have been discovered
//It celebrates and displays the play again button
function gameOver() {
  //Celebrate all matches being made
  console.log("OMFG, You matched them all!");
  playAgain.style.display = "block";

  //store and record a new best score if needed
  if (bestScore === 0 || score < bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);

    console.log("YAY, A NEW BEST SCORE!");
    //TODO: Notify user that they got the highscore
    //TODO: fanfare
  }

}


//event handler for card clicks
function handleCardClick(event) {
  console.log("you just clicked", event.target);
  let card = event.target;

  //let the player pick no more than two cards
  //each pair selected adds to the score.
  if (selected.length < 2) {
    selected.push(card);
    card.removeEventListener("click", handleCardClick);
    card.style.backgroundColor = card.classList[1];


    //if two cards have been selected...
    if (selected.length === 2) {
      score++;
      scoreDisplay.innerText = score;

      //if the two cards match
      if (selected[0].style.backgroundColor === selected[1].style.backgroundColor) {
        //fanfare 
        console.log("You made a match!  HELLS YEAH!!!");
        //selected[0].removeEventListener("click", handleCardClick); //already removed
        selected[1].removeEventListener("click", handleCardClick);
        selected.splice(0, selected.length);
        matches++;

        //if all matches have been discovered
        if (matches === 5) {
          gameOver();
        }
      }

      //if the cards don't match
      else setTimeout(() => {
        selected[0].addEventListener("click", handleCardClick);  //put the event listeners back
        selected[1].addEventListener("click", handleCardClick);
        selected[0].style.backgroundColor = "white";             //flip the cards back around
        selected[1].style.backgroundColor = "white";
        selected.splice(0, selected.length);                     //clear the "selected" array
      }, 1000);
    }
    

  }

}

//setup a new game
function newGame() {

  playAgain.style.display = "none";       //hide the play again button
  score = 0;                              //reset score and match counts
  matches = 0;
  bScoreDisplay.innerText = bestScore;
  scoreDisplay.innerText = score;

  //erase old deck
  let deck = document.getElementsByClassName("card");
  while(deck.length > 0){deck[0].remove()};

  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors)
}

//after the DOM contents load store
//the elements we need in varables and
//set our first listeners
function initializeGame() {
  gameContainer = document.getElementById("game");
  scoreDisplay = document.getElementById("scorevalue");
  bScoreDisplay = document.getElementById("bestscore");
  playAgain = document.getElementById("playagain");

  playAgain.addEventListener("click", newGame);

  //animate the mouse down and mouse up. 
  playAgain.addEventListener("mousedown", (e) => { e.target.classList.add("press") });
  playAgain.addEventListener("mouseup", (e) => { e.target.classList.remove("press") });

  //retrieve best score from local storage
  //first check if it exists and is a number
  if (!isNaN(parseInt(localStorage.getItem("bestScore")))) {
    bestScore = parseInt(localStorage.getItem("bestScore"));
  } else bestScore = 0;

  newGame();
}

// when the DOM loads
document.addEventListener("DOMContentLoaded", initializeGame);


