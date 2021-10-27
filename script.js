"use strict";
const cvs = document.querySelector("#sanke");
const ctx = cvs.getContext("2d");

const box = 32;

//Maydonni yaratamiz

const ground = new Image();
ground.src = "./img/ground.png";

//olmachani olamiz

const foodImg = new Image();
foodImg.src = "./img/food.png";

//musiclarni yuklaymiz
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "./music/audio_dead.mp3";
eat.src = "./music/audio_eat.mp3";
up.src = "./music/audio_up.mp3";
right.src = "./music/audio_right.mp3";
down.src = "./music/audio_down.mp3";
left.src = "./music/audio_left.mp3";
//Ilonni hosil qilamz
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let score = 0;

//ilonchani ruli
let d;
document.addEventListener("keydown", direction);
function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
    down.play();
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
    up.play();
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "greenyellow";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);
  //
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //rul buyicha uzgartirish
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;
  //
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    //remove
    snake.pop();
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  //uyin tugashi
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    dead.play();
    clearInterval(game);
  }

  //add new head

  snake.unshift(newHead);
  ctx.fillStyle = "white";
  ctx.font = "45px Change one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}
let game = setInterval(draw, 100);
