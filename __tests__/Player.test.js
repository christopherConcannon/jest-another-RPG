const Player = require('../lib/Player');
// establish Potion as a valid variable even though we are short-circuiting it with mock data
const Potion = require('../lib/Potion');
// bring in mock data
jest.mock('../lib/Potion');


// test that a player object has a name and three number properties: health, strength and agility
test('creates a player object', () => {
  const player = new Player('Dave');

  expect(player.name).toBe('Dave');
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));
  // check for creation of inventory array holding potion objects
  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
})

// check that player.getStats() method returns an object with four specific properties
test("gets player's stats as an object", () => {
  const player = new Player('Dave');

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');

})

// on player creation player.getInventory() should return an array
test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));

  // if we empty out the array to simulate player having used all his/her potions, getInventory() should return false
  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
})

// check that player.getHealth() returns a string containing player.health
test("gets player's health value", () => {
  const player = new Player('Dave');

  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
})

// check that player.isAlive() returns truthy or falsy
test('checks if player is alive or not', () => {
  const player = new Player('Dave');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;
   
  expect(player.isAlive()).toBeFalsy();
})

// check that correct amount of health is being subtracted from the Player.health property by player.reduceHealth()
test("subtracts from player's health", () => {
  const player = new Player('Dave');
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);
  // check that health cannot go below 0
  player.reduceHealth(99999);

  expect(player.health).toBe(0);
})

// verify player.getAttackValue() returns a value within specified range based on hardcoded initial strength value
test("gets player's attack value", () => {
  const player = new Player('Dave');
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// check that length of inventory array holding potions increases when player.addPotion() is called
test('adds a potion to the inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// check that player.inventory array of potions decreases in length when player.usePotion() is called since potion will have been consumed
test('uses a potion from inventory', () => {
  const player = new Player('Dave');
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});
