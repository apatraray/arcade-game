const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const modalList = document.querySelectorAll('.modal');
const btn = document.querySelector(".myBtn");

// Enemy class with properties
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.posX = x;
    this.posY = y;
    this.speed = speed;
    this.width = 101;
    this.height = 76;
};

/* This function updates the enemy position according to the change in time.
 * If the enemy reaches the end of the canvas, set the position of the
 * enemy to the starting of the canvas to any of the random place in the rock.
 * Set the speed to random value for each enemy.
 */
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

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

// Instantiate three enemies and put them in an array.
let allEnemies = [];
for(let iterator=0; iterator<3; iterator++){
    let height = getRandomInt(40, 180);
    let speed = Math.floor(Math.random() * 300) + 60;
    let enemy = new Enemy(0, height, speed);
    allEnemies.push(enemy);
}

// function to write random number between two numbers.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Player class with properties
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.posX = 200;
    this.posY = 400;
    this.width = 85;
    this.height = 80;
    this.score = 0;
    this.isCollision = false;
    this.lives = 3;
    this.isRestart = false;
};

Player.prototype.update = function(dt) {
};

Player.prototype.reset = function() {
  updateScore();
  this.posX = 200;
  this.posY = 400;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

/* This function updates the player position according to user input.
 * Check that the player is within the canvas always.
 * If the player reaches the water, call the reset() function for the player.
 * Set the speed to random value for each player.
 */
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
                this.reset();
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
};

// Instantiate the player object.
const player = new Player();

/* This function updates the score.
 * If there is a collision, deduct the score by five points if the score is >=5.
 * Update the lives.
 * If there is no collision, add the score by ten.
 * If player score is equal to or more than 100, winning modal appears.
 */
function updateScore(){
    if(player.isCollision === true){
        if(player.score >= 5){
            player.score -= 5;
        }
        updateLives();
        player.isCollision = false;
    }
    else{
        player.score += 10;
    }
    score.innerHTML = player.score;

    if(player.score >= 100){
        modalList[0].classList.add('win-box');
    }
}

/* This function updates the lives.
 * If there is a collision, deduct one live till all lives are gone.
 * Show a modal when all the lives are gone.
 */
function updateLives(){
    player.lives--;
    if(player.lives >= 0){
        lives.children[2-player.lives].firstChild.classList.add('absent');
    }

    if(player.lives === 0){
        modalList[1].classList.add('fail-box');
    }
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//add event listener for game rules button so that modal appears that is
//showing the rules for the game.
document.getElementById("btn").addEventListener('click', function(e){
    document.querySelector('.modal-btn').classList.add('btn-how-to-play');
    document.querySelector('.modal-btn').addEventListener('click', closeNewModal);
function closeNewModal(event){
    document.querySelector('.modal-btn').style.display = "none";
}
});

/*
* add event listener to modal
*   - close modal when clicked anywhere in modal
*/
modalList.forEach(function(modal){
    modal.addEventListener('click', closeModal);
});
function closeModal(event){
    this.style.display = "none";
}
