var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.querySelector("#pickedColorDisplay");
var meassageDisplay = document.querySelector("#message");
var head = document.querySelector(".head-style");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

pickedColorDisplay.textContent = pickedColor;
init();

resetButton.addEventListener("click", function() {
  reset();
});

function changeColors() {
  for (var i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = pickedColor;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  var arr = [];
  // add num random colors to array
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  // return the array
  return arr;
}

function randomColor() {
  // pick a red from 0-255
  var red = Math.floor(Math.random() * 256);
  // pick a green from 0-255
  var green = Math.floor(Math.random() * 256);
  // pick a blue from 0-255
  var blue = Math.floor(Math.random() * 256);

  // "rgb(255,0,0)"
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  pickedColorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  meassageDisplay.textContent = "";
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  head.style.background = "steelblue";
}

function init() {
  // modeButtons event Listeners
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add inital colors to the squares
    //squares[i].style.backgroundColor = colors[i];

    // add an click listeners
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // compare color to picked color
      //console.log(clickedColor, pickedColor);
      if (clickedColor === pickedColor) {
        // Correct
        // Winner msg
        meassageDisplay.textContent = "YAY !!!";
        resetButton.textContent = "Play Again";
        changeColors();
        head.style.background = pickedColor;
      } else {
        // Wrong: Remove
        this.style.backgroundColor = "#232323"; // REFACTOR: make a css class
        meassageDisplay.textContent = "TRY AGAIN";
      }
    });
  }
}
