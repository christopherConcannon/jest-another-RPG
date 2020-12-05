// return object with Potion.name and Potion.value
class Potion {
	constructor(name) {
    this.types = [ 'strength', 'agility', 'health' ];
    // Potion.name will be passed as an argument or it will return a random value from types array
		this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    // if Potion.name is health set Potion.value to a rando number between 30 and 40
		if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    // otherwise assign Potion.value to rando number between 7 and 12
		} else {
			this.value = Math.floor(Math.random() * 5 + 7);
		}
	}
}

module.exports = Potion;
