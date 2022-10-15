//initialize variables for html elements
let gameContainer = null;
let scoreDisplay = null;
let bScoreDisplay = null;
let playAgain = null;

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

//how many cards the user has turned over
let selected = [];
let score = 0;
let bestScore = 0;
let matches = 0;


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

function gameOver() {
  //Celebrate all matches being made
  console.log("OMFG, You matched them all!");
  playAgain.style.display = "block";

  if (bestScore === 0 || score < bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);

    console.log("YAY, A NEW BEST SCORE!");
    //Notify user that they got the highscore
    //fanfare
  }

}


//TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  let card = event.target;

  //let the player pick no more than two cards
  //each pair selected adds to the score.
  if (selected.length < 2) {
    selected.push(card);
    card.style.backgroundColor = card.classList[1];

    if (selected.length === 2) {
      score++;
      scoreDisplay.innerText = score;

      if (selected[0].style.backgroundColor === selected[1].style.backgroundColor) {
        //fanfare
        console.log("You made a match!  HELLS YEAH!!!");
        selected[0].removeEventListener("click", handleCardClick);
        selected[1].removeEventListener("click", handleCardClick);
        selected.splice(0, selected.length);
        matches++;
        if (matches === 5) {
          gameOver();
        }
      }

      else setTimeout(() => {
        selected[0].style.backgroundColor = "white";
        selected[1].style.backgroundColor = "white";
        selected.splice(0, selected.length);
      }, 1000);
    }
    //store a timer in the card object, inside of the selected array

  }

}
function newGame() {

  playAgain.style.display = "none";
  score = 0;
  matches = 0;
  bScoreDisplay.innerText = bestScore;
  scoreDisplay.innerText = score;

  //erase old deck
  let deck = document.getElementsByClassName("card");
  console.log(deck.length);
  for (let i = deck.length - 1; i >= 0; i--) {
    console.log("removing ", deck[i].classList);
    deck[i].remove();
  }

  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors)
}

function initializeGame() {
  gameContainer = document.getElementById("game");
  scoreDisplay = document.getElementById("scorevalue");
  bScoreDisplay = document.getElementById("bestscore");
  playAgain = document.getElementById("playagain");

  playAgain.addEventListener("click", newGame);
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


