const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 10; // create grid boxes Example: each cell is 20x20 pixels

let snake = [{ x: 3 * grid, y: 3 * grid }]; //array of  segments is first 0 and segement position is object,  Initial snake position 
let direction = { x: 1, y: 0 }; // object Initial direction right vhanges with input from buttons
let food = {};
let score = 0;
let gameInterval;
const gameSpeed = 250; // Milliseconds per game update

const moveSound = new Audio('sounds/move.mp3'); 
const eatSound = new Audio('sounds/eating.mp3');   
const gameOverSound = new Audio('sounds/gameover.mp3'); 
const buttonSound = new Audio('sounds/button.mp3'); 
let playsoundTime=12;
let movecount=0;

function createFood() {
  food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid; // gives fraction multiplued by total available cells horizon x grid gives random x cordinate between x axis of canvas
  food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid; // same for y axis
  // Add logic to prevent food from spawning on the snake later
}

function update() { // actual game logic status here
  // 1. Move the Snake
  const head = { ...snake[0] }; // Create a shallow copy of the snake array 0 to current const head object contain initial x and y coordinates
  head.x += direction.x * grid; // this is direction +1 -1 of x add minus from initial x axis multi with grid to get next box grid
  head.y += direction.y * grid; // same for y to get y axis based on direction + or - 
  snake.unshift(head); // Add the new head to the beginning of snake array 
   
  // 2. Handle Food Consumption
  if (head.x === food.x && head.y === food.y) { // if head x cordi same on food cordi 
    score++; // increase score
    eatSound.play();
    createFood(); // create again new food invoke createfood after eating each time
  } else {
    // 3. Remove the Tail (if no food eaten)
    snake.pop(); // remove the last element in array snake to decrease size
  }

  // 4. Drawing the Game using ctx rendering 2d tool
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas argument four, start x ,start y upto ,canvas with as end x , canvas total height as end y

  // Draw the food
  ctx.fillStyle = 'pink'; //any element next to this line should be green filled
  ctx.fillRect(food.x, food.y, grid, grid); // rectbox with four argu , first two for axis x,y as on  food , next two for w and h same as grid 

  // Draw the snake
  snake.forEach((segment, index) => { // this is for each function contain function with three argu we use only two to iterate
    ctx.fillStyle = index === 0 ? 'lime' : 'green'; // Different color for the head and body in snake array
    ctx.fillRect(segment.x, segment.y, grid, grid);
    ctx.strokeStyle = 'yellow';
    ctx.strokeRect(segment.x, segment.y, grid, grid); // Optional: draw grid lines strokes around segments
  });
  movecount++;
  if( movecount % playsoundTime === 0 ){
  moveSound.play();
  }
  
  // You'll add collision detection (walls and self) in the next step
    // **--- COLLISION DETECTION ---**

  // 1. Collision with Walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) { // outside canvas cordinates 
    gameOver(); // invoke gameover You'll need to create this function
    return; // Stop the update function
  }

  // 2. Collision with Self
  for (let i = 1; i < snake.length; i++) { // Start from 1 to exclude the head
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver(); // Call game over if head hits any body segment
      return; // Stop the update function
    }
  }

  //end of update
}

function gameOver() {
  clearInterval(gameInterval); // is clear intervel to Stop the set interval fun which has calbak fun and dely parameters, gameinterval holds set intervrl return timer values
  gameOverSound.play();
  alert(`Game Over! Your score: ${score}`);
  resetGame(); // Call reset game function
}

  function resetGame() {
  snake = [{ x: 3 * grid, y: 3 * grid }];
  direction = { x: 1, y: 0 };
  score = 0;
   movecount=0; 
  createFood();
  gameInterval = setInterval(update, gameSpeed);
}

function changeDirection(newDirection) {
  // Prevent immediate 180-degree turns
  if (newDirection === 'up' && direction.y === 0) {
    direction = { x: 0, y: -1 };// if up key text ehen y is 0 i.e when dirc l or r move down 
    buttonSound.play();
  } else if (newDirection === 'down' && direction.y === 0) {  // remember in any graphics system screen y axis inverted up is -y
    direction = { x: 0, y: 1 };
    buttonSound.play();
  } else if (newDirection === 'left' && direction.x === 0) {
    direction = { x: -1, y: 0 };
    buttonSound.play();
  } else if (newDirection === 'right' && direction.x === 0) { // x will be same axis no inverted , right is +x
    direction = { x: 1, y: 0 };
    buttonSound.play();
  }
}




//Initial food creation
createFood(); // call food for first time when page loads

// Start the game loop for first time when webpage  loads 
gameInterval = setInterval(update, gameSpeed); // set interval starts game repetedly with time in milli, gamespeed , set interval returns timeer id ti game interval variable

// Add event listeners to the arrow buttons
document.getElementById('upArrow').addEventListener('click', () => changeDirection('up')); // always listen to key events from buttons 
document.getElementById('downArrow').addEventListener('click', () => changeDirection('down'));
document.getElementById('leftArrow').addEventListener('click', () => changeDirection('left'));
document.getElementById('rightArrow').addEventListener('click', () => changeDirection('right'));






  
