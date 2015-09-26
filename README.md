# Socket Through the Ages

```JavaScript
var game = new Game();
var player1 = game.addPlayer();
var player2 = game.addPlayer();
var player3 = game.addPlayer();
var player4 = game.addPlayer();
player1.developments.purchase("Quarrying");
player1.developments.purchase("Agriculture");
player1.developments.purchase("Coinage");
player1.developments.purchase("Masonry");
player1.cities.addWorkers(4);
player1.monuments.addWorkersTo("Great Wall", 4);
player1.goods.add(8);
player1.roll();
player1.dice.debug();
player1.roll();
player1.dice.debug();
player1.roll();
player1.dice.debug();

console.log(player1.totalPoints());
player1.debug();
```
