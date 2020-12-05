const Potion = require('./Potion');

// Enemy constructor defines name and weapon from parameters
function Enemy(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  // give Enemy a random potion 
  this.potion = new Potion();
  // assign random values for health, strength and agility
  this.health = Math.floor(Math.random() * 10 + 85);
  this.strength = Math.floor(Math.random() * 5 + 5);
  this.agility = Math.floor(Math.random() * 5 + 5);
}

// refactor to inherit methods from Character.prototype
Enemy.prototype = Object.create(Character.prototype);

// // Ditto Player
// Enemy.prototype.getHealth = function() {
//   return `${this.name}'s health is now ${this.health}!`;
// };
// // Ditto Player
// Enemy.prototype.isAlive = function() {
//   if (this.health === 0) {
//     return false;
//   }
//   return true;
// };
// // Ditto Player
// Enemy.prototype.reduceHealth = function(health) {
//   this.health -= health;

//   if (this.health < 0) {
//     this.health = 0;
//   }
// };
// // Ditto Player
// Enemy.prototype.getAttackValue = function() {
//   const min = this.strength - 5;
//   const max = this.strength + 5;

//   return Math.floor(Math.random() * (max - min) + min);
// };
// present new enemy at start of new battle
Enemy.prototype.getDescription = function() {
  return `A ${this.name} holding a ${this.weapon} has appeared!`;
}


module.exports = Enemy;