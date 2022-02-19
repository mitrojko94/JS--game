"use strict";

//Selecting elements
let score0El = (document.querySelector("#score--0").textContent = 0);
//Uvek koristiti querySelector, ali kad dobavljamo id, mozemo da koristimo i getElementById. Tu se kao parametar prosledi samo id, bez #
let score1El = (document.getElementById("score--1").textContent = 0);
const diceEl = document.querySelector(".dice");

//Selektovanje igraca
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//Selektovanje imena
const player1Name = prompt("Enter your name:");
const name1 = (document.getElementById("name--0").textContent = player1Name);
const player2Name = prompt("Enter your name:");
const name2 = (document.getElementById("name--1").textContent = player2Name);

let scores, currentScore, activePlayer, playing;

//Ova f-ja je napravljena da bi radilo dugme reset tj. new game
const init = function () {
  //Sve ispod 4 navedene varijable moraju biti napravljene sa let van f-je, inace nece raditi
  scores = [0, 0]; //Ovo su veliki skorovi, ukupni, ispod Playera 1
  currentScore = 0; //Ne moze biti u f-ji, jer ce svakim pritiskom dugmeta biti rezultat 0, zato mora biti van f-je
  activePlayer = 0; //Ovo je prvi igrac, tj. Player 1
  playing = true;

  console.log("New Game!");
  document.getElementById("score--0").textContent = 0; //brisem i vracam na 0 glavni skor
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--0").textContent = 0; //brisem i vracam na 0 trenutni skor
  document.getElementById("current--1").textContent = 0;
  //Stavili smo u varijablu ime klase koju hocemo da sakrijemo i onda toj varijabli pozovemo metodu classList i metodu add(prosledimo sta hocemo da sakrijemo)
  diceEl.classList.add("hidden"); //ovu klasu prvo dodati u style.css, ako prethodno nije dodata
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active"); //stavio sam ovo add, jer kad idem new game, da mi player0 uvek bude prvi igrac
  player1El.classList.remove("player--active");
};
init();

//F-ja za promenu igraca
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Stavio sam 0, da bi kad dobijem 1 score bio 0 i prebacio se na sledeceg igraca i poceo brojanje od 0
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //Ako je igrac 0, postace 1 i obrnuto. Ovako sam napravio promenu igraca
  player0El.classList.toggle("player--active"); //Ova metoda toggle dodaje klasu ako nije tu, a ako jeste tu brise je
  player1El.classList.toggle("player--active");
};

//Selektujem dugmad
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Roling dice functionality

btnRoll.addEventListener("click", function () {
  //Napravio sam varijabliu playing = true i stavio da kad igramo, mogu da koristim ove kodove ispod
  if (playing) {
    console.log("Button Clicked!");
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //Koristio sam ternar literal, da mi izbaci sliku za broj, zato sam isao dice-${dice}.png

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice; //Isto je i ovako: currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Na osnovu ovoga, napravio sam da se samo izabere koji je igrac
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//Pravljenje HOLD BUTTONA
btnHold.addEventListener("click", function () {
  if (playing) {
    //Provera tj. trazenje i otklanjanje greske
    console.log("Hold Button!");
    console.log(scores[activePlayer]);
    //1. Add current score to active player's score
    //scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore; //Stavim da mi je key nase varijable scores activePlayer, jer to govori koji je igrac. I samo prosledim += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 40) {
      //3. Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //4. Switch to the next player
      switchPlayer();
    }
  }
});

//Ovo ispod je dugme za new game, prosledim mu "click" i f-ju za new game, koju sam napravio iznad
btnNew.addEventListener("click", init);
