import Game from './Game.js'

export const colors = ['blue', 'green', 'red', 'yellow', 'purple']

export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Game
})