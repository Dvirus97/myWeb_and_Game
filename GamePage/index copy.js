this.window.addEventListener("load", function () {
  const ball = document.querySelector("#ball");
  const board = document.querySelector("#board");
  const racket = document.querySelector("#racket");
  const scoreLbl = document.querySelector("#score");
  const pauseText = document.querySelector("#pauseText");

  function getStyleFloat(element, style) {
    return parseFloat(window.getComputedStyle(element).getPropertyValue(style));
  }

  const racketWidth = getStyleFloat(racket, "width");
  const boardHeight = getStyleFloat(board, "height");
  const boardWidth = getStyleFloat(board, "width");
  const ballHeight = getStyleFloat(ball, "height");
  const ballWidth = getStyleFloat(ball, "width");

  const ballStep = 1.3;
  const racketStep = 10;
  let winPoints = 0;
  let losePoints = 0;
  let isPause = false;
  let intervalID;

  startGame();
  function startGame() {
    updateScore();
    this.window.addEventListener("keydown", keyboardDown);
    this.window.addEventListener("keydown", pauseDown);
    ballMove();
  }
  function keyboardDown(e) {
    console.log(e.code);
    const racketLeft = getStyleFloat(racket, "left");
    switch (e.code) {
      case "ArrowLeft":
        if (racketLeft > 0) {
          racket.style.left = racketLeft - racketStep + "px";
        }
        break;
      case "ArrowRight":
        if (racketLeft + racketWidth < boardWidth) {
          racket.style.left = racketLeft + racketStep + "px";
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
      const ballTop = getStyleFloat(ball, "top");
      if (ballTop + ballHeight >= boardHeight) {
        chackCollision();
        return;
      }
      ball.style.top = ballTop + ballStep + "px";
    }, 10);
  }
  function chackCollision() {
    const minRacket = getStyleFloat(racket, "left");
    const maxRacket = minRacket + racketWidth;
    const ballLeft = getStyleFloat(ball, "left");
    if (ballLeft <= maxRacket && ballLeft >= minRacket) {
      winPoints += 1;
      racketShadow("shadowWin");
    } else {
      losePoints += 1;
      racketShadow("shadowLose");
    }
    updateScore();
    resetBall();
  }
  function updateScore() {
    scoreLbl.innerHTML = `win- ${winPoints} : lose- ${losePoints}`;
  }
  function resetBall() {
    function randint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    ball.style.left = randint(0, boardWidth - ballWidth) + "px";
    ball.style.top = 0 + "px";
  }
  function racketShadow(className) {
    racket.classList.add(className);
    setTimeout(() => {
      racket.classList.remove(className);
    }, 200);
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