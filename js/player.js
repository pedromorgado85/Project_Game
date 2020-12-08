const playerImg = new Image();
playerImg.src = "../images/1.png";

const playerImg1 = new Image();
playerImg1.src = "../images/2.png";

const playerImg2 = new Image();
playerImg2.src = "../images/3.png";

const playerImg3 = new Image();
playerImg3.src = "../images/4.png";

const playerImg4 = new Image();
playerImg4.src = "../images/5.png";

const playerImages = {
  level0: playerImg,
  level1: playerImg1,
  level2: playerImg2,
  level3: playerImg3,
  level4: playerImg4,
};

class Player {
  constructor(game) {
    this.name = "";
    this.money = 300;
    this.alcohol = 0.0;
    this.posX = 500;
    this.posY = 650;
    this.speed = 0;
    this.height = 20;
    this.width = 30;
    this.game = game;
    this.context = game.context;
    this.image = playerImages;
  }

  drawPlayer() {
    if (this.alcohol <= 2.0) {
      this.context.drawImage(playerImages.level0, this.posX, this.posY);
    } else if (this.alcohol <= 3.5) {
      this.context.drawImage(playerImages.level1, this.posX, this.posY);
    } else if (this.alcohol <= 4.5) {
      this.context.drawImage(playerImages.level2, this.posX, this.posY);
    } else if (this.alcohol <= 5.5) {
      this.context.drawImage(playerImages.level3, this.posX, this.posY);
    } else if (this.alcohol <= 7.0) {
      this.context.drawImage(playerImages.level4, this.posX, this.posY);
    }
  }

  catchDrinks() {
    this.game.drinks.forEach((drink) => {
      this.catchDrink(drink);
    });
  }

  catchDrink(drink) {
    if (
      !(
        this.posX + this.width < drink.posX ||
        this.posX > drink.posX + drink.width
      ) &&
      !(
        this.posY + this.height < drink.posY ||
        this.posY > drink.posY + drink.height
      )
    ) {
      this.riseAlcohol(drink.alcohol);
      this.spendMoney(drink.cost);
      if (this.alcohol >= 7 || this.money <= 0) {
        this.game.isEnded = true;
      }
      this.game.drinks.shift();
    }
  }

  riseAlcohol(alcohol) {
    this.alcohol += alcohol;
    if (this.alcohol < 0) {
      this.alcohol = 0;
    }
  }

  decreaseAlcohol(alcohol) {
    this.alcohol -= alcohol;
  }

  spendMoney(cost) {
    this.money -= cost;
  }

  movePlayer() {
    if (this.posX > 1000) {
      this.posX = 1000 - this.width;
    } else if (this.posX < 0) {
      this.posX = 0;
    } else {
      this.posX += this.speed;
    }
  }

  moveRight() {
    this.speed = 7;
  }

  moveLeft() {
    this.speed = -7;
  }

  stop() {
    this.speed = 0;
  }
}
