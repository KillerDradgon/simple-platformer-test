const canvas = document.querySelector("canvas");
canvas.width = 1200;
canvas.height = 500;
canvas.style.backgroundColor = "white";
const ctx = canvas.getContext("2d");

let gravity = 0.5;
let keyPressed = {
  w: false,
  a: false,
  s: false,
  d: false,
};

class Player {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.position = {
      x: canvas.width / 2 - this.width / 2,
      y: 50,
    };
    this.velocity = { x: 0, y: 3 };
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (!(this.position.x + this.width + this.velocity.x <= canvas.width)) {
      this.velocity.x = 0;
    } else if (!(this.position.x + this.velocity.x >= 0)) {
      this.velocity.x = 0;
    }
    if (!(this.position.y + this.velocity.y >= 0)) {
      this.velocity.y = 0;
    }
    this.position.y += this.velocity.y;

    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;

    this.draw();
  }
}
const myPlayer = new Player();
myPlayer.draw();

const animation = () => {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "40px Roboto";
  ctx.fillStyle = "#262626c4";
  ctx.fillText("Game", canvas.width / 2 - 50, canvas.height / 2);

  if (keyPressed.d) {
    myPlayer.velocity.x = 8;
  } else if (keyPressed.a) {
    myPlayer.velocity.x = -8;
  } else myPlayer.velocity.x = 0;

  if (keyPressed.w && myPlayer.velocity.y == 0) {
    console.log(myPlayer.velocity.y);
    myPlayer.velocity.y = -20;
  }

  myPlayer.update();
};
animation();

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keyPressed.w = true;
      break;
    case "a":
      keyPressed.a = true;
      break;
    case "s":
      keyPressed.s = true;
      break;
    case "d":
      keyPressed.d = true;
      break;
  }
});

addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keyPressed.w = false;
      break;
    case "a":
      keyPressed.a = false;
      break;
    case "s":
      keyPressed.s = false;
      break;
    case "d":
      keyPressed.d = false;
      break;
  }
});
