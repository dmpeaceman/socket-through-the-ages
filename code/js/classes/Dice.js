"use strict";

var DICE_3_FOOD              = '3_FOOD';
var DICE_3_WORKERS           = '3_WORKERS';
var DICE_2_FOOD_OR_2_WORKERS = '2_FOOD_OR_2_WORKERS';
var DICE_1_GOOD              = '1_GOOD';
var DICE_2_GOODS_AND_1_SKULL = '2_GOODS_AND_1_SKULL';
var DICE_COINS               = 'COINS';

class Dice
{
    constructor(game, player)
    {
        this.game           = game;
        this.player         = player;
        this.totalDie       = this.player.cities.totalCompleted();
        this.dice = [];
        for( var i = 0; i < this.totalDie; i++ ) {
            this.dice.push( null );
        }

        this.rollsCompleted = 0;
        this.diceSides      = [
            DICE_3_FOOD,
            DICE_3_WORKERS,
            DICE_1_GOOD,
            DICE_2_FOOD_OR_2_WORKERS,
            DICE_COINS,
            DICE_2_GOODS_AND_1_SKULL
        ];
    }

    roll( diceIndices )
    {
        var rollAll            = (typeof diceIndices == "undefined");
        var lastLeadershipRoll = (this.rollsCompleted == MAX_ROLLS && this.player.developments.has("Leadership") && diceIndices.length == 1)

        if( this.rollsCompleted < MAX_ROLLS || lastLeadershipRoll ) {
            var rolledIndex;
            for( var i = 0; i < this.totalDie; i++ ) {

                if( rollAll || (diceIndices.indexOf(i) > -1) ) {

                    // Double check that we aren't re-rolling a scull, unless it's a last leadership roll
                    if( lastLeadershipRoll || this.dice[i] != DICE_2_GOODS_AND_1_SKULL ) {
                        rolledIndex = Math.floor(Math.random() * 6);
                        this.dice[i] = this.diceSides[rolledIndex];
                    }
                }
            }
            
            this.rollsCompleted++;
        }
        console.log(this.dice);
        this.debug();
    }

    total(type, dieFace)
    {
        var total = 0;
        for( var i in this.dice ) {
            var die = this.dice[i];
            if( typeof dieFace == "undefined" || die == dieFace ) {
                if( type == 'FOOD' ) {
                    if( die == DICE_3_FOOD || die == DICE_2_FOOD_OR_2_WORKERS ) {
                        total += (die == DICE_3_FOOD) ? 3 : 2;

                        if( this.player.developments.has("Agriculture") ) {
                            total += 1;
                        }
                    }
                } else if( type == 'WORKERS' ) {
                    if( die == DICE_3_WORKERS || die == DICE_2_FOOD_OR_2_WORKERS ) {
                        total += (die == DICE_3_WORKERS) ? 3 : 2;

                        if( this.player.developments.has("Masonry") ) {
                            total += 1;
                        }
                    }
                } else if( type == 'GOODS') {
                    if( die == DICE_1_GOOD || die == DICE_2_GOODS_AND_1_SKULL ) {
                        if( this.total("SKULLS") >= 5 && !this.player.developments.has("Religion") ) {
                            total = 0;
                        } else {
                            total += (die == DICE_2_GOODS_AND_1_SKULL) ? 2 : 1;
                        }
                    }
                } else if( type == 'COINS') {
                    if( die == DICE_COINS ) {
                        total += 7;

                        if( this.player.developments.has("Coinage") ) {
                            total += 5;
                        }
                    }
                } else if( type == 'SKULLS') {
                    if( die == DICE_2_GOODS_AND_1_SKULL ) {
                        total += 1;
                    }
                }
            }
        }
        return total;
    }

    totalFixedFood()
    {
        return this.total('FOOD', DICE_3_FOOD);
    }

    totalOptionalFood()
    {
        return this.total('FOOD', DICE_2_FOOD_OR_2_WORKERS);
    }

    totalFixedWorkers()
    {
        return this.total('WORKERS', DICE_3_WORKERS);
    }

    totalOptionalWorkers()
    {
        return this.total('WORKERS', DICE_2_FOOD_OR_2_WORKERS);
    }

    totalGoods()
    {
        return this.total('GOODS');
    }

    totalCoins()
    {
        return this.total('COINS');
    }

    totalSkulls()
    {
        return this.total('SKULLS');
    }

    debug()
    {
        console.log(this.dice);
        console.log("FOOD: "+this.totalFixedFood());
        console.log("OPTIONAL FOOD: "+this.totalOptionalFood());
        console.log("FIXED WORKERS: "+this.totalFixedWorkers());
        console.log("OPTIONAL WORKERS: "+this.totalOptionalWorkers());
        console.log("GOODS: "+this.totalGoods());
        console.log("COINS: "+this.totalCoins());
        console.log("SKULLS: "+this.totalSkulls());
    }
}