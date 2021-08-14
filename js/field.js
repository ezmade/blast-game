import Tile from './Tile.js'
import { colors, getRandom } from './script.js'

export default class Field {
    
    constructor(n, m) {
        this.n = n
        this.m = m
        this.minGroupLength = 2
        this.neededColor = ""
        this.scores = 0
        this.progress = 0
        this.neededScores = 275
        this.moves = 10
        this.tiles = []
        this.checkedTiles = new Set()
        this.group = new Set()
    }

    getN() {
        return this.n
    }

    getM() {
        return this.m
    }

    getNeededScores() {
        return this.neededScores
    }

    getProgress() {
        return this.progress
    }

    getScores() {
        return this.scores
    }

    addScores(points) {

        this.scores += points
    }

    getMoves() {
        return this.moves
    }

    getTile(x, y) {
        return this.tiles[x][y]
    }

    getGroup() {
        return this.group;
    }

    getMinGroupLength() {
        return this.minGroupLength
    }

    setNeededColor(color) {
        this.neededColor = color
    } 

    // Заполнение массива тайлов значениями
    createField() {
        let index = 0
        for (var x = 0; x < this.n; x++) {
            this.tiles[x] = []
            for (var y = 0; y < this.m; y++) {
                var tile = new Tile(index, colors[getRandom(0, colors.length - 1)], x, y)
                this.tiles[x][y] = tile
                index++
            }
        }
    }

    // Обнуление начальных значений игры
    reloadField() {
        this.createField()
        this.scores = 0
        this.moves = 10
        this.progress = 0
    }

    // Поиск групп тайлов по указанным координатам
    findGroup(x, y) {
        if (this.checkCoordinates(x, y))
            if (!this.checkedTiles.has(this.tiles[x][y]) && 
                this.tiles[x][y].getColor() == this.neededColor) {
                this.group.add(this.tiles[x][y])
                this.checkedTiles.add(this.tiles[x][y])
                this.findGroup(x+1, y)
                this.findGroup(x, y+1)
                this.findGroup(x-1, y)
                this.findGroup(x, y-1)
            }
    }

    // Очистка списка групп тайлов
    clearGroup() {
        this.neededColor = ""
        this.group.clear()
        this.checkedTiles.clear()
    }

    // Удаление группы тайлов с поля
    removeGroup() {
        this.updateProgress(this.group.size);
        for (let tile of this.group) 
            tile.setColor("blank")
        this.clearGroup()
    }

    // Обновление значений прогресса и очков
    updateProgress(countOfTiles) {
        if (countOfTiles == 2)
            this.addScores(5)
        else if (countOfTiles <= 5)
            this.addScores(countOfTiles * 5)
        else 
            this.addScores(countOfTiles * 10)
        if (this.scores >= this.neededScores)
            this.progress = 100
        else 
            this.progress = ((100 * this.scores) / this.neededScores)
        this.moves--
    }

    // Перемещение тайлов после удаления групп
    moveTiles() {
        for (let x = this.n - 1; x >= 0; x--) 
            for (let y = 0; y < this.m; y++) 
                if (this.tiles[x][y].isEmpty()) 
                    this.fillTile(x, y)
    }

    // Заполнение пустых ячеек, оставшихся после перемещения тайлов
    fillEmptyTiles() {
        for (let x = 0; x < this.n; x++) 
            for (let y = 0; y < this.m; y++) 
                if (this.tiles[x][y].isEmpty()) 
                    this.tiles[x][y].setColor(colors[getRandom(0, colors.length-1)])
    }

    // Заполнение цветом тайла с указанными координатами
    fillTile(x, y) {
        let done = false
        let x2 = x - 1
        while (!done) {
            if (this.checkCoordinates(x2, y))
                if (!this.tiles[x2][y].isEmpty()) {
                    this.tiles[x][y].setColor(this.tiles[x2][y].getColor())
                    this.tiles[x2][y].setColor("blank")
                    done = true
                } else
                    x2--
            else 
                done = true
        }
    }

    // Проверка координат на корректность
    checkCoordinates(x, y) {
        if (x < 0 || y < 0 || x >= this.n || y >= this.m)
            return false
        return true
    }
}