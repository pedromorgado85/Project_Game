window.onload = () => {
  console.log("Loaded...");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);
  console.dir(game);
  game.startAnimation();
  window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 32:
        game.isStarted = true;
        break;
    }
  });
};
