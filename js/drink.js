const vodkaImg = new Image();
vodkaImg.src = "../images/vodka.svg";

const whiskeyImg = new Image();
whiskeyImg.src = "../images/whiskey.svg";

const beiraoImg = new Image();
beiraoImg.src = "../images/brandy.svg";

const beerImg = new Image();
beerImg.src = "../images/beer-1.svg";

const coffeeImg = new Image();
coffeeImg.src = "../images/coffee-cup.svg";

const waterImg = new Image();
waterImg.src = "../images/water-bottle.svg";

const absinthImg = new Image();
absinthImg.src = "../images/alcoholic-drink-1.svg";

const wineImg = new Image();
wineImg.src = "../images/wine-glass.svg";

const martiniImg = new Image();
martiniImg.src = "../images/martini.svg";

const milkImg = new Image();
milkImg.src = "../images/milk.svg";

const iceTeaImg = new Image();
iceTeaImg.src = "../images/ice-tea.svg";

const drinkImages = {
  vodka: vodkaImg,
  whiskey: whiskeyImg,
  beer: beerImg,
  coffee: coffeeImg,
  beirao: beiraoImg,
  water: waterImg,
  absinth: absinthImg,
  wine: wineImg,
  martini: martiniImg,
  milk: milkImg,
  iceTea: iceTeaImg,
};

class Drink {
  constructor(game, name) {
    this.game = game;
    this.context = game.context;
    this.name = name;
    this.image = drinkImages[name];
    switch (name) {
      case "vodka":
        this.alcohol = 0.3;
        this.cost = 10;
        break;
      case "whiskey":
        this.alcohol = 0.4;
        this.cost = 12;
        break;
      case "beirao":
        this.alcohol = 0.2;
        this.cost = 8;
        break;
      case "beer":
        this.alcohol = 0.1;
        this.cost = 6;
        break;
      case "coffee":
        this.alcohol = -4;
        this.cost = 5;
        break;
      case "water":
        this.alcohol = -2;
        this.cost = 8;
        break;
      case "absinth":
        this.alcohol = 0.7;
        this.cost = 13;
        break;
      case "wine":
        this.alcohol = 0.2;
        this.cost = 5;
        break;
      case "martini":
        this.alcohol = 0.2;
        this.cost = 5;
        break;
      case "milk":
        this.alcohol = -3;
        this.cost = 7;
      case "iceTea":
        this.alcohol = -2;
        this.cost = 4;
        break;
      default:
        this.alcohol = 1;
        this.cost = 15;
        break;
    }
    this.posX = Math.random() * 1000;
    this.posY = 0;
    this.imageRatio = 50 / 167;
    this.width = 70;
    this.height = 70;
  }

  drawDrink() {
    //this.context.fillStyle = "white";
    //this.context.fillRect(this.posX, this.posY, this.height, this.weight);
    this.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  moveDrink() {
    this.posY += 3;
  }
}
