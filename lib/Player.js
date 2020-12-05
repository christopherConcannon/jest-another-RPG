const Character = require('./Character');
const Potion = require('./Potion');

class Player extends Character {

	constructor(name = '') {
    // name is passed to super (Character) constructor to call it, setting up the prototype for Player
    super(name);

    // 
		this.inventory = [ new Potion('health'), new Potion() ];
	}

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
