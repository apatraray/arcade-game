// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.posX = x;
    this.posY = y;
    this.speed = speed;
    this.width = 101;
    this.height = 76;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.posX > 505){
        this.posX = 0;
        this.posY = getRandomInt(70, 250);
        this.speed = Math.floor(Math.random() * 300) + 60;
    }
    else{
        this.posX += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

let allEnemies = [];
for(let iterator=0; iterator<3; iterator++){
  let height = getRandomInt(40, 180);
  let speed = Math.floor(Math.random() * 300) + 60;
  let enemy = new Enemy(0, height, speed);
  allEnemies.push(enemy);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-pink-girl.png';
    this.posX = 200;
    this.posY = 400;
    this.width = 85;
    this.height = 80;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};
// Draw the enemy on the screen, required method for game
Player.prototype.handleInput = function(input) {
    switch(input){
        case 'left':
            if(this.posX > 50){
                this.posX -= 100;
            }
            break;
        case 'up':
            if(this.posY > 40){
                this.posY -= 80;
            }
            if(this.posY < 80){
                //addscore
                //player move to initial
            }
            break;
        case 'right':
            if(this.posX < 400){
                this.posX += 100;
            }
            break;
        case 'down':
            if(this.posY < 400){
                this.posY += 80;
            }
            break;
    }
  /*  if(this.posY > 70 && this.posY < 250){
        checkCollisions();
    } */
};

/*
    function checkCollisions(){
        allEnemies.forEach(function(enemy) {
          console.log("enemyX" + enemy.posX + "playerX" + player.posX);
          console.log("enemyY" + enemy.posY + "playerY" + player.posY);
            if(enemy.posX < player.posX +  && enemy.posY === player.posY){
                console.log("collision happened");
                reset();
            }
      });
    }
*/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
