const moneyImg = new Image();
moneyImg.src = "../images/money.svg";

const liquorImg = new Image();
liquorImg.src = "../images/drink.svg";

const backgroundImg = new Image();
backgroundImg.src = "../images/BarBackground.png";

const initialImg = new Image();
initialImg.src = "../images/startGame.png";

const securityImg = new Image();
securityImg.src = "../images/security-guard.svg";

const ambulanceImg = new Image();
ambulanceImg.src = "../images/ambulance.svg";

const sound = new Audio();
sound.loop = true;
sound.src = "";

class Game {
  constructor(context) {
    this.context = context;
    this.player = new Player(this);
    this.drinks = [];
    this.levelSpeed = 5000;
    this.drinkCreationSpeed = 1500;
    this.drinksNames = [
      "vodka",
      "whiskey",
      "beirao",
      "beer",
      "coffee",
      "water",
      "absinth",
      "wine",
      "martini",
      "milk",
      "iceTea",
    ];
    this.isStarted = false;
    this.isEnded = false;
  }
  deleteEverything() {
    this.context.clearRect(0, 0, 1300, 750);
  }

  drawInitialScreen() {
    this.context.drawImage(initialImg, 0, 0, 1300, 750);
    this.context.fontSize = "70px";
    this.context.fillStyle = "black";
    this.context.fillText("Open ", 100, 50);
  }

  drawGameOverScreen() {
    if (this.player.money <= 0) {
      this.context.fillStyle = "purple";
      this.context.fillRect(0, 0, 1300, 750);
      this.context.fillStyle = "black";
      this.context.fillText("You´re broke !!! See you next Friday", 500, 500);
      this.context.drawImage(securityImg, 80, 300);
    } else if (this.player.alcohol >= 7) {
      this.context.fillStyle = "yellow";
      this.context.fillRect(0, 0, 1300, 750);
      this.context.fillStyle = "black";
      this.context.fontSize = "40px";
      this.context.fillText("Can you even walk!?", 800, 500);
      this.context.drawImage(ambulanceImg, 90, 300);
    }
  }

  restartGame() {
    this.player.posX = 500;
    this.player.posY = 650;
    this.player.alcohol = 0.0;
    this.player.money = 400;
    this.speed = 0;

    this.isStarted = true;
    this.isEnded = false;
    this.levelSpeed = 6000;
    this.drinkCreationSpeed = 2000;
    this.drinks = [];
  }

  drawGame() {
    this.context.drawImage(backgroundImg, 0, 0, 1300, 750);
  }

  drawDrinks() {
    this.drinks.forEach((drink) => {
      drink.drawDrink();
    });
  }

  drawEverything() {
    if (!this.isStarted) {
      this.drawInitialScreen();
    } else if (this.isEnded) {
      this.drawGameOverScreen();
    } else {
      this.drawGame();
      this.drawDrinks();
      this.player.drawPlayer();
      this.drawScore();
    }
    // this.drinks.drawDrink();
    //console.log("Everything is drawn");
  }

  moveEverything() {
    this.moveDrinks();
    this.breakDrinks();
    this.player.movePlayer();
    // console.log("state changed");
  }

  moveDrinks() {
    this.drinks.forEach((drink) => {
      drink.moveDrink();
    });
  }

  // Vamos filtrar do array drinks a condição falsa (drink.posY + drink.height >= 800)
  breakDrinks() {
    this.drinks = this.drinks.filter((drink) => {
      return drink.posY + drink.height < 800;
    });
  }

  drawScore() {
    // this.context.fillStyle = "red";
    // this.context.fillRect(855, 10, 135, 90);
    this.context.font = "30px Arial";
    this.context.fillStyle = "white";
    this.context.fillText(`${this.player.money}€`, 1150, 50);
    this.context.drawImage(moneyImg, 1090, 20, 50, 50);
    this.context.fillText(this.player.alcohol.toFixed(1), 1150, 120);
    this.context.drawImage(liquorImg, 1090, 80, 50, 50);
  }

  setControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 39:
          this.player.moveRight();
          break;
        case 37:
          this.player.moveLeft();
          break;
        case 13:
          if (this.isEnded) {
            this.restartGame();
          }
          break;
        default:
      }
    });
    window.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 39:
          this.player.stop();
          break;
        case 37:
          this.player.stop();
          break;
        default:
      }
    });
  }

  updateEverything(pastTimestamp, pastTimestamp2) {
    // console.log("I´m updating everything");
    this.deleteEverything();
    this.moveEverything();
    this.player.catchDrinks();
    this.drawEverything();
    requestAnimationFrame((timestamp) => {
      //garrafas não podem ser criadas antes do jogo começar nem depois de acabar
      if (
        timestamp - pastTimestamp > this.drinkCreationSpeed &&
        this.isStarted &&
        !this.isEnded
      ) {
        const randomDrinkName = this.drinksNames[
          Math.floor(Math.random() * this.drinksNames.length)
        ];
        const drink = new Drink(this, randomDrinkName);
        this.drinks.push(drink);
        console.log(drink.name);
        // console.log(this.drinks);
        pastTimestamp = timestamp;
      }
      // controla velocidade dos niveis
      if (
        timestamp - pastTimestamp2 > this.levelSpeed &&
        this.isStarted &&
        !this.isEnded
      ) {
        this.drinkCreationSpeed *= 0.8;
        console.log(this.drinkCreationSpeed);
        pastTimestamp2 = timestamp;
      }

      this.updateEverything(pastTimestamp, pastTimestamp2);
    });
  }
  startAnimation() {
    this.updateEverything(0, 0);
    this.setControls();
  }
}
