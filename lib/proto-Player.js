// bring in Potion to add to Player.inventory
const Potion = require('../lib/Potion');
// new Player gets called with name, defaulting to empty string if none is passed
function Player(name = '') {
  this.name = name;

  // initial health b/w 95-105
  this.health = Math.floor(Math.random() * 10 + 95);
  // intial strength b/w 7-12
  this.strength = Math.floor(Math.random() * 5 + 7);
  // intial agility b/w 7-12
  this.agility = Math.floor(Math.random() * 5 + 7);

  this.inventory = [new Potion('health'), new Potion()];
}

  // // returns an object with various player properties
  // this.getStats = function() {
  //   return {
  //     potions: this.inventory.length,
  //     health: this.health,
  //     strength: this.strength,
  //     agility: this.agility
  //   };
  // };

  // // returns the inventory array or false if empty
  // this.getInventory = function() {
  //   if (this.inventory.length) {
  //     return this.inventory;
  //   }
  //   return false;
  // };

  

  // inherit prototype methods from Character here.  must be before you add any other methods to prototype or those methods will be overwritten
  Player.prototype = Object.create(Character.prototype);


  // use .prototype so each instance does not have it's own method, thus cutting down on code writing and overhead

  // method to return subset of player statistics data to be logged.  logging logic is in Game object not here so this constructor remains more versatile
  Player.prototype.getStats = function() {
      return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
      };
    };

  // return array of potion object or false if empty
  Player.prototype.getInventory = function() {
      if (this.inventory.length) {
        return this.inventory;
      }
      return false;
    };

  // // return string for Game to console.log after enemy has attacked
  // Player.prototype.getHealth = function() {
  //   return `${this.name}'s health is now ${this.health}!`;
  // };

  // // check if player is still alive at end of battle
  // Player.prototype.isAlive = function() {
  //   if (this.health === 0) {
  //     return false;
  //   }
  //   return true;
  // };

  // // subtract damage caused by enemyAttack value from Player.health making sure it can not go below 0
  // Player.prototype.reduceHealth = function(health) {
  //   this.health -= health;

  //   if (this.health < 0) {
  //     this.health = 0;
  //   }
  // };

  // // return random number between 2 and 7 (based on initial strength range of 7-12).  this is used to determine the damage inflicted on the enemy.  use min/max values instead of hard-coded so we can adjust range later if we want
  // Player.prototype.getAttackValue = function() {
  //   const min = this.strength - 5;
  //   const max = this.strength + 5;

  //   return Math.floor(Math.random() * (max - min) + min);
  // };

  // add enemy's potion to player.inventory if enemy is defeated
  Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
  };

  // when potion is used, remove it from inventory (since it is consumed) and update player property that corresponds to potion 
  Player.prototype.usePotion = function(index) {
    // return a new array of potions (1 element in length) by splicing at index of desired potion and removing 1 element.  then access the first (and only) element of the new array.  this is the specified potion
    const potion = this.getInventory().splice(index, 1)[0];

    // update player properties with specified potion.value
    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength': 
        this.strength += potion.value;
        break;
    }
  };


  // refactored to inherit from Character.prototype...remove all methods except getStats

  // function Player(name = '') {
  //   this.name = name;
  
  //   this.health = Math.floor(Math.random() * 10 + 95);
  //   this.strength = Math.floor(Math.random() * 5 + 7);
  //   this.agility = Math.floor(Math.random() * 5 + 7);
  
  //   this.inventory = [new Potion('health'), new Potion()];
  // }
  
  // // inherit prototype methods from Character here:
  // Player.prototype = Object.create(Character.prototype);
  
  // Player.prototype.getStats = function() {
  //   return {
  //     potions: this.inventory.length,
  //     health: this.health,
  //     strength: this.strength,
  //     agility: this.agility
  //   };
  // };




module.exports = Player;