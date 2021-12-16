let music = new Audio("ting.mp3");
let turn = "X";
let someones_turn = document.querySelector(".whose-turn");
someones_turn.innerText = "X's turn";

function turn_change() {
  turn === "X" ? (turn = "O") : (turn = "X");
}

//actually checking if all boxes are filled are not
function check_draw() {
  let count = 0;
  let spantexts = document.querySelectorAll(".textinside");
  spantexts.forEach(function (spantext) {
    if (spantext.innerText !== "") {
      count++;
    }
  });
  if (count == 9) return true;
  else return false;
}

//updating the game status
let state = document.querySelector("#status");
function gamestatus(champ, isdraw, whose_turn) {
  let gameover = document.querySelector("#status");
  let toshow = document.querySelector(".gamestatus");
  let img_adj = document.querySelector("img-ctrl");
  if (isdraw && !champ) {
    toshow.classList.add("show");
    gameover.innerText = "It's a tie!";
  } else if (!isdraw && champ) {
    gameover.innerText = "Game over " + whose_turn + " Wins!";
    toshow.classList.add("show");
  } else if (!isdraw && !champ) {
    turn_change();
    someones_turn.innerText = turn + "'s turn";
  } else if (isdraw && champ) {
    gameover.innerText = "Game over " + whose_turn + " Wins!";
    toshow.classList.add("show");
  }
}

//check if the current player won or not
function win_check(turn) {
  let texts = document.querySelectorAll(".textinside");
  if (
    texts[0].innerText === texts[1].innerText &&
    texts[1].innerText === texts[2].innerText &&
    texts[0].innerText === turn
  ) {
    return true;
  } else if (
    texts[0].innerText === texts[3].innerText &&
    texts[3].innerText === texts[6].innerText &&
    texts[0].innerText === turn
  ) {
    return true;
  } else if (
    texts[1].innerText === texts[4].innerText &&
    texts[4].innerText === texts[7].innerText &&
    texts[1].innerText === turn
  ) {
    return true;
  } else if (
    texts[2].innerText === texts[5].innerText &&
    texts[5].innerText === texts[8].innerText &&
    texts[2].innerText === turn
  ) {
    return true;
  } else if (
    texts[3].innerText === texts[4].innerText &&
    texts[4].innerText === texts[5].innerText &&
    texts[3].innerText === turn
  ) {
    return true;
  } else if (
    texts[6].innerText === texts[7].innerText &&
    texts[7].innerText === texts[8].innerText &&
    texts[6].innerText === turn
  ) {
    return true;
  } else if (
    texts[0].innerText === texts[4].innerText &&
    texts[4].innerText === texts[8].innerText &&
    texts[0].innerText === turn
  ) {
    return true;
  } else if (
    texts[2].innerText === texts[4].innerText &&
    texts[4].innerText === texts[6].innerText &&
    texts[2].innerText === turn
  ) {
    return true;
  } else {
    return false;
  }
}

// reset button when clicked should over-write the previously entered boxes to be empty and set the turn to be x
let reset = document.querySelector(".reset");
reset.addEventListener("click", refresh);
function refresh() {
  let spanText = document.querySelectorAll(".textinside");
  spanText.forEach(function (element) {
    element.innerText = "";
  });
  let state = document.querySelector(".gamestatus");

  state.classList.remove("show");

  turn = "X";
  someones_turn.innerText = "X's turn";
}

//main loop
let texts = document.querySelectorAll(".box");
//select all boxes
texts.forEach(function (singlebox) {
  let spanText = singlebox.querySelector(".textinside");
  //add event listener to each box to listen for a click
  singlebox.addEventListener("click", function () {
    if (spanText.innerText === "") {
      //update span text only if the box is being clicked for the first time i.e if it is empty
      spanText.innerText = turn;
      music.play();
      let ifwinner = win_check(turn);
      let itsdraw = check_draw();
      gamestatus(ifwinner, itsdraw, turn);
    }
  });
});
