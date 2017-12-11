/* eslint-disable
    no-console,
    no-debugger,
    class-methods-use-this
*/

import 'pixi';
import { Phaser } from 'phaser';

import ROT from 'rot-js';

const WIDTH = 16 * 32;
const HEIGHT = 16 * 24;

class Game {
    init() {
        console.log('init');
    }

    preload() {
        console.log('preload');
    }

    create() {
        console.log('create start');

        console.log(new ROT.FOV.RecursiveShadowcasting(() => {}));

        console.log('create end');
    }

    update() {
        console.log('update');
    }

    // NOTE: removed this for cleaner logging
    // preRender() {
    //     console.log('preRender');
    // }

    render() {
        console.log('render');
    }
}

const game = new Phaser.Game({
    width: WIDTH,
    height: HEIGHT,
    renderer: Phaser.AUTO,
});

game.state.add('Game', Game, true);
