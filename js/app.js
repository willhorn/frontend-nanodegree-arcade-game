var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(level) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-202, 606);
    this.y = 60 + (83 * level);
    this.speed = getRandomInt(101, 505);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x >= 606)
        this.x = -202;
    if (this.y == player.y)
        var playerLeft = player.x + 18;
        var playerRight = playerLeft + 65;
        var enemyLeft = this.x + 2;
        var enemyRight = enemyLeft + 97;
        if (playerRight > enemyLeft && playerLeft < enemyRight) {
            player.x = 202;
            player.y = 60 + (83*4);
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 60 + (83*4);
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0)
                this.x -= 101;
            break;
        case 'up':
            if (this.y > 60)
                this.y -= 83;
            else {// winner!
                this.x = 202;
                this.y = 60 + (83*4);
            }
            break;
        case 'right':
            if (this.x < 404)
                this.x += 101;
            break;
        case 'down':
            if (this.y < (60 + (83*4)))
                this.y += 83;
            break;
    }
};
Player.prototype.update = function() {};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var createEnemies = function(number) {
    var enemies = [];
    var init = getRandomInt(0, 3);
    for (let i = 0; i < number; i++) {
        enemies.push(new Enemy((init + i) % 3));
    };
    return enemies;
}
allEnemies = createEnemies(5);
// Place the player object in a variable called player
var player = new Player();


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
