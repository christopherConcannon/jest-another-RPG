const Character = require('./Character');
const Potion = require('./Potion');

class Player extends Character {
  
	constructor(name = '') {
    super(name);


		this.inventory = [ new Potion('health'), new Potion() ];
	}

	// // inherit prototype methods from Character
	// Player.prototype = Object.create(Character.prototype);

	// use .prototype so each instance does not have it's own method, thus cutting down on code writing and overhead
	getStats() {
		return {
			potions  : this.inventory.length,
			health   : this.health,
			strength : this.strength,
			agility  : this.agility
		};
	}

	getInventory() {
		if (this.inventory.length) {
			return this.inventory;
		}
		return false;
	}

	addPotion(potion) {
		this.inventory.push(potion);
	}

	usePotion(index) {
		const potion = this.getInventory().splice(index, 1)[0];

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
	}
}
module.exports = Player;
