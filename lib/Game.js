const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// set properties for game logic
function Game() {
	this.roundNumber = 0;
	this.isPlayerTurn = false;
	this.enemies = [];
	this.currentEnemy;
	this.player;
}


Game.prototype.initializeGame = function() {
  // fill enemies array
	this.enemies.push(new Enemy('goblin', 'sword'));
	this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));
  // fill enemies array, designate first enemy
  this.currentEnemy = this.enemies[0];
  // get user name from command-line prompt
  inquirer
	.prompt({
		type    : 'text',
		name    : 'name',
		message : 'What is your name?'
	})
	// destructure name from the prompt object and create new instance of Player class, passing in user name as arg.  store in Game class' player property 
	.then(({ name }) => {
		this.player = new Player(name);

    // call method to start new battle
		this.startNewBattle();
	});
};
// configure first battle and call again anytime new round starts
Game.prototype.startNewBattle = function() {
  // compare player and enemy agility to see who goes first
	if (this.player.agility > this.currentEnemy.agility) {
		this.isPlayerTurn = true;
	} else {
		this.isPlayerTurn = false;
  }
  // display Player's stats
	console.log('Your stats are as follows:');
  console.table(this.player.getStats());
  // announce current enemy and weapon
	console.log(this.currentEnemy.getDescription());
  // now that constestants are configured, call logic for battle
	this.battle();
};
// main event that will run an indefinite number of times, once for each contestant's battle action
Game.prototype.battle = function() {
  // if Player's turn ask if they want to attack enemy, thus reducing enemy's health, or use a potion which will supplement the Player's stat corresponding to the potion used.
	if (this.isPlayerTurn) {
		inquirer
			.prompt({
				type    : 'list',
				message : 'What would yo like to do?',
				name    : 'action',
				choices : [ 'Attack', 'Use potion' ]
			})
			.then(({ action }) => {
        // if player chooses to use potion
				if (action === 'Use potion') {
          // verify that player has potion remaining, if not s/he loses turn...tough luck
					if (!this.player.getInventory()) {
						console.log("You don't have any potions!");
						return this.checkEndOfBattle();
					}
          // if player has potion, present potion inventory to choose from 
					inquirer
						.prompt({
							type    : 'list',
							message : 'Which potion would you like to use?',
              name    : 'action',
              // inquirer only returns a string value, so populate choices with a mapped array of the inventory that includes a user-readable (non-zero indexed) derived index value so we can keep track of choice.  
							choices : this.player
								.getInventory()
								.map((item, index) => `${index + 1}: ${item.name}`)
						})
						.then(({ action }) => {
              // create an array from the inquirer-returned string holding index and Potion name (ex. ['2', 'agility'])
							const potionDetails = action.split(': ');
              // apply chosen potion by passing re-derived index (first element of potionDetails array) to usePotion() method
              this.player.usePotion(potionDetails[0] - 1);
              // log which potion was used (second element of potionDetails array)
              console.log(`You used a ${potionDetails[1]} potion.`);
              // turn over check if battle is over
							this.checkEndOfBattle();
            });
        // otherwise, if player chooses to attack instead of use potion
				} else {
          // get a random value for the player's attack and store it in damage const
          const damage = this.player.getAttackValue();
          // remove the value in damage const from enemy's health
					this.currentEnemy.reduceHealth(damage);
          // log the details of attack and its effects
					console.log(`You attacked the ${this.currentEnemy.name}`);
					console.log(this.currentEnemy.getHealth());
          // turn over check if battle is over
					this.checkEndOfBattle();
				}
      });
  // otherwise if it is enemy's turn...
	} else {
    // get rando value for enemy's attack and store it in damage
    const damage = this.currentEnemy.getAttackValue();
    // subtract damage value from player's health
		this.player.reduceHealth(damage);
    // log the attack and updated player health value
		console.log(`You were attacked by the ${this.currentEnemy.name}`);
		console.log(this.player.getHealth());
    // turn over check if battle is over
		this.checkEndOfBattle();
	}
};
// check for win/lose conditions to see if battle should end or continue
Game.prototype.checkEndOfBattle = function() {
  // first verify if both character's are still alive (health > 0) and can continue fighting
	if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    // if so, switch attacker...
    this.isPlayerTurn = !this.isPlayerTurn;
    // ...and run battle round again
    this.battle();
  // otherwise if player is alive and enemy is dead...
	} else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    //... anounce player victory
		console.log(`You've defeated the ${this.currentEnemy.name}`);
    // ...add defeated enemy's potion to player inventory
    this.player.addPotion(this.currentEnemy.potion);
    // ...anounce potion procurement
		console.log(
			`${this.player.name} found a ${this.currentEnemy.potion.name} potion`
		);
    // increment round number
		this.roundNumber++;
    // check if there are any more enemies to fight, otherwise player wins.  once the round number is not less than the length of the enemies array, all the enemies will have fought
		if (this.roundNumber < this.enemies.length) {
      // if so, pick the next enemy from the array
      this.currentEnemy = this.enemies[this.roundNumber];
      // and start a new battle round
			this.startNewBattle();
		} else {
      // if no more enemies, player wins entire game
			console.log('You win!');
    }
  // otherwise player is not alive so player loses
	} else {
		console.log("You've been defeated!");
	}
};



module.exports = Game;
