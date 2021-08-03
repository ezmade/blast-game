class Field {
    
    constructor(n, m) {

        this.n = n;
        this.m = m;
        this.minGroupLength = 2;
        this.neededColor = "";
        this.scores = 0;
        this.neededScores = 200;
        this.steps = 10;
        this.tiles = [];
        this.checkedTiles = new Set();
        this.group = new Set();
    }

    getNeededScores() {

        return this.neededScores;
    }

    getScores() {

        return this.scores;
    }

    addScores(points) {

        this.scores += points;
    }

    getSteps() {

        return this.steps;
    }

    getTile(x, y) {

        return this.tiles[x][y];
    }

    getGroup() {

        return this.group;
    }

    getMinGroupLength() {

        return this.minGroupLength;
    }

    setNeededColor(color) {

        this.neededColor = color; 
    } 

    createField() {

        let index = 0;
        for (var x = 0; x < this.n; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.m; y++) {
                var tile = new Tile(index, colors[getRandom(0, colors.length - 1)], x, y)
                this.tiles[x][y] = tile;
                index++;
            }
        }
    }

    reloadField() {

        this.createField();
        this.scores = 0;
        this.steps = 10;
        this.showField();
    }

    showField() {

        let window = document.querySelector(".window");
        let field = document.querySelector("table");
        let scoresLabel = document.getElementById("scores");
        let stepsLabel = document.getElementById("steps");
        if (field) {
            window.removeChild(field);
        }
        field = document.createElement("table");
        let tr = "", td = "", tile = "";
        for (let x = 0; x < this.n; x++) {
            tr = document.createElement("tr");
            for (let y = 0; y < this.m; y++) {
                td = document.createElement("td");
                tile = document.createElement("div");
                tile.setAttribute("class", "tile");
                tile.setAttribute("id", this.tiles[x][y].index)
                tile.setAttribute("onclick", "clickedOnTile(" + x + ", " + y + ")")
                if (!this.tiles[x][y].isEmpty()) {
                    tile.style.background = "URL('./assets/img/" + this.tiles[x][y].color + ".png') no-repeat";
                    tile.style.backgroundSize = "cover";
                }
                td.appendChild(tile);
                tr.appendChild(td);
            }
            field.appendChild(tr);
        }
        scoresLabel.textContent = "Очки: " + this.scores.toString();
        stepsLabel.textContent = "Шаги: " + this.steps.toString();
        window.appendChild(field);
    }

    findGroup(x, y) {

        if (this.checkCoordinates(x, y)) {
            if (!this.checkedTiles.has(this.tiles[x][y]) && 
                this.tiles[x][y].getColor() == this.neededColor) {
                this.group.add(this.tiles[x][y]);
                this.checkedTiles.add(this.tiles[x][y]);
                this.findGroup(x+1, y);
                this.findGroup(x, y+1);
                this.findGroup(x-1, y);
                this.findGroup(x, y-1);
            }
            
        }
    }

    clearGroup() {

        this.neededColor = "";
        this.group.clear();
        this.checkedTiles.clear();
    }

    removeGroup() {

        let size = this.group.size;
        for (let tile of this.group) {
            tile.setColor("blank");
        }
        if (size == 2) this.addScores(5); 
        else if (size <= 5) this.addScores(size * 5);
        else this.addScores(size * 10);
        this.steps--;
        this.clearGroup();
    }

    moveTiles() {

        for (let x = this.n - 1; x >= 0; x--) {
            for (let y = 0; y < this.m; y++) {
                if (this.tiles[x][y].isEmpty()) {
                    this.fillTile(x, y);
                }
            }
        }
    }

    fillEmptyTiles() {

        for (let x = 0; x < this.n; x++) {
            for (let y = 0; y < this.m; y++) {
                if (this.tiles[x][y].isEmpty()) {
                    this.tiles[x][y].setColor(colors[getRandom(0, colors.length-1)]);
                }
            }
        }
    }

    fillTile(x, y) {
        
        let done = false;
        let x2 = x - 1;
        while (!done) {
            if (this.checkCoordinates(x2, y)) {
                if (!this.tiles[x2][y].isEmpty()) {
                    this.tiles[x][y].setColor(this.tiles[x2][y].getColor());
                    this.tiles[x2][y].setColor("blank");
                    done = true;
                } else {
                    x2--;
                }
            } else {
                done = true;
            }
        }
    }

    checkCoordinates(x, y) {

        if (x < 0 || y < 0 || x >= this.n || y >= this.m) {
            return false;
        }
        return true;
    }
}