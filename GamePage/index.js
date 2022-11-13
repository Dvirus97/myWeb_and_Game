this.window.addEventListener("load", function () {
  const ballDiv = document.querySelector("#ball");
  const boardDiv = document.querySelector("#board");
  const racketDiv = document.querySelector("#racket");
  const scoreLbl = document.querySelector("#score");
  const pauseText = document.querySelector("#pauseText");

  let racket = new GamePiece(racketDiv, (step = 10));
  let ball = new GamePiece(ballDiv, (step = 1.3));
  let board = new GamePiece(boardDiv);

  let score = {
    win: 0,
    lose: 0,
    uiElement: scoreLbl,
    toString: function () {
      return `win: ${this.win} | lose: ${this.lose}`;
    },
    show: function () {
      this.uiElement.innerText = this.toString();
    },
  };

  let isPause = false;
  let intervalID;

  startGame();
  function startGame() {
    score.show();
    this.window.addEventListener("keydown", keyboardDown);
    this.window.addEventListener("keydown", pauseDown);
    ballMove();
  }
  function keyboardDown(e) {
    // console.log(e.code);

    switch (e.code) {
      case "ArrowLeft":
        if (racket.x > 0) {
          racket.x -= racket.step;
        }
        break;
      case "ArrowRight":
        if (racket.x + racket.width < board.width) {
          racket.x += racket.step;
        }
        break;
    }
  }
  function pauseDown(e) {
    switch (e.code) {
      case "Space":
        pauseMenu();
        break;
    }
  }
  function ballMove() {
    intervalID = setInterval(() => {
      if (ball.y + ball.height >= board.height) {
        chackCollision();
        return;
      }
      ball.y += ball.step;
    }, 10);
  }
  function chackCollision() {
    const racketMax = racket.x + racket.width;
    if (racket.x <= ball.x && ball.x <= racketMax) {
      score.win += 1;
      racket.glow("blue");
    } else {
      score.lose += 1;
      racket.glow("red");
    }
    score.show();
    resetBall();
  }

  function resetBall() {
    function randint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    ball.x = randint(0, board.width - ball.width);
    ball.y = 0;
  }

  function pauseMenu() {
    if (isPause) {
      isPause = false;
      pauseText.style.display = "none";
      this.window.addEventListener("keydown", keyboardDown);
      ballMove();
    } else {
      isPause = true;
      pauseText.style.display = "block";
      this.window.removeEventListener("keydown", keyboardDown);
      clearInterval(intervalID);
    }
  }
});

class GamePiece {
  #x = 0;
  #y = 0;
  #width = 0;
  #height = 0;
  #element;
  constructor(uiElement, step = 0) {
    this.#element = uiElement;
    this.#x = uiElement.offsetLeft;
    this.#y = uiElement.offsetTop;
    this.#width = uiElement.clientWidth;
    this.#height = uiElement.clientHeight;
    this.step = step;
  }

  get x() {
    return this.#x;
  }
  set x(number) {
    this.#x = number;
    this.#element.style.left = number + "px";
  }
  get y() {
    return this.#y;
  }
  set y(number) {
    this.#y = number;
    this.#element.style.top = number + "px";
  }
  get width() {
    return this.#width;
  }
  set width(number) {
    this.#width = number;
    this.#element.style.width = number + "px";
  }
  get height() {
    return this.#height;
  }
  set height(number) {
    this.#height = number;
    this.#element.style.height = number + "px";
  }
  toString() {
    return `${this.x},${this.y},${this.width},${this.height}`;
  }
  glow(color) {
    this.#element.style.boxShadow = `3px 3px 3px ${color}, 
    -3px -3px 3px ${color}, 
    3px -3px 3px ${color},
    -3px 3px 3px ${color}`;
    setTimeout(
      () =>
        (this.#element.style.boxShadow = `0px 0px 0px ${color}, 
            -0px -0px 0px ${color}, 
            0px -0px 0px ${color},
            -0px 0px 0px ${color}`),
      200
    );
  }
}
