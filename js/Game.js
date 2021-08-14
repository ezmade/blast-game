import Phaser from './phaser.js'
import Field from './Field.js'

const settings = {
    scaleFactor: 0.25,
    tileWidth: 171,
    tileHeight: 192,
    fieldOffset: {
        x: 55,
        y: 140
    }
}

export default class Game extends Phaser.Scene {
    constructor() {
        super("BlastGame")
    }

    preload() {
        this.load.image('bg', './assets/img/bg_layer.png')
        this.load.image('field', './assets/img/field.png')
        this.load.image('blue', './assets/img/blue.png')
        this.load.image('green', './assets/img/green.png')
        this.load.image('purple', './assets/img/purple.png')
        this.load.image('red', './assets/img/red.png')
        this.load.image('yellow', './assets/img/yellow.png')
        this.load.image('btn_1', './assets/img/btn_1.png')
        this.load.image('btn_2', './assets/img/btn_2.png')
        this.load.image('btn_plus', './assets/img/btn_plus.png')
        this.load.image('btn_pause', './assets/img/btn_pause.png')
        this.load.image('money_1', './assets/img/money_1.png')
        this.load.image('money_2', './assets/img/money_2.png')
        this.load.image('bonus', './assets/img/bonus.png')
        this.load.image('panel_score', './assets/img/panel_score.png')
        this.load.image('progress_bar', './assets/img/progress_bar.png')
    }

    create() {
        this.add.image(0, 0, 'bg')
        this.add.image(100, 40, 'money_2').setScale(settings.scaleFactor-0.02)
        this.add.image(600, 40, 'money_1').setScale(settings.scaleFactor-0.02)
        this.add.image(680, 42, 'btn_plus').setScale(settings.scaleFactor)
        this.add.image(750, 42, 'btn_pause').setScale(settings.scaleFactor)
        this.add.image(225, 330, 'field').setScale(settings.scaleFactor)
        this.add.image(530, 570, 'btn_1').setScale(settings.scaleFactor)
        this.add.image(700, 570, 'btn_2').setScale(settings.scaleFactor)
        this.add.image(525, 490, 'bonus').setScale(settings.scaleFactor)
        this.add.image(625, 490, 'bonus').setScale(settings.scaleFactor)
        this.add.image(725, 490, 'bonus').setScale(settings.scaleFactor)
        this.add.image(625, 265, 'panel_score').setScale(settings.scaleFactor)
        this.add.image(350, 35, 'progress_bar').setScale(settings.scaleFactor)
        this.add.text(585, 125, 'ВРЕМЯ:').setFontSize(24)
        this.add.text(310, 10, 'ПРОГРЕСС').setFontSize(18)
        this.add.text(595, 315, 'ОЧКИ:').setFontSize(24)
        this.add.text(580, 410, 'БОНУСЫ').setFontSize(24)
        this.field = new Field(9, 9);
        this.canClick = true
        this.tiles = []
        this.field.createField()
        this.scores = this.add.text(595, 340, '').setFontSize(30)
        this.moves = this.add.text(600,215, '').setFontSize(40)
        this.displayField()
        this.input.on('pointerdown', this.clickedOnTile, this)
    }

    // Отображение игрового поля
    displayField() {
        for (let i = 0; i < this.field.getM(); i++) {
            this.tiles[i] = []
            for (let j = 0; j < this.field.getN(); j++) {
                let tile = this.add.image(
                    settings.fieldOffset.x+i*settings.tileWidth*settings.scaleFactor, 
                    settings.fieldOffset.y+j*settings.tileHeight*settings.scaleFactor, 
                    this.field.getTile(j, i).getColor()).setScale(settings.scaleFactor)
                this.tiles[i][j] = tile;
            }
        }
        this.updateProgress()
    }

    // Удаление тайлов с поля
    displayDestroying(tiles) {
        tiles.forEach(function(tile) {
            this.tiles[tile.getY()][tile.getX()].destroy()                
        }.bind(this))
    }

    // Изменение значений прогресса
    updateProgress() {
        this.scores.setText(this.field.getScores())
        this.moves.setText(this.field.getMoves())
    }

    // Проверка выигрыша или проигрыша
    checkProgress() {
        if (this.field.getScores() >= this.field.getNeededScores()) {
            alert('Вы выиграли! Поздравляем!')
            this.field.reloadField()
        }
        else if (this.field.getMoves() == 0) {
            alert('Вы програли. Попробуйте ещё раз.')   
            this.field.reloadField()
        }
        this.displayField()
    }

    // Обработка нажатия на тайл
    clickedOnTile(pointer) {
        if (this.canClick) {
            let y = Math.floor((pointer.y - settings.fieldOffset.y/2) / (settings.tileHeight*settings.scaleFactor)) - 1
            let x = Math.floor((pointer.x - settings.fieldOffset.x/2) / (settings.tileWidth*settings.scaleFactor))
            if (this.field.checkCoordinates(y, x)) {
                this.canClick = false
                this.field.setNeededColor(this.field.getTile(y, x).getColor())
                this.field.findGroup(y, x)
                let groups = this.field.getGroup()
                this.displayDestroying(groups)
                this.field.removeGroup() 
                this.field.moveTiles()
                this.field.fillEmptyTiles()
                this.checkProgress()
                this.canClick = true
            } 
        }
    }
}
