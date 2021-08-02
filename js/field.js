class Field {
    
    constructor(n, m) {

        this.n = n;
        this.m = m;
        this.minGroupLength = 2;
        this.neededColor = "";
        this.tiles = [];
        this.checkedTiles = new Set();
        this.group = new Set();
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

        var index = 0;
        for (var x = 0; x < this.n; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.m; y++) {
                var tile = new Tile(index, colors[getRandom(0, colors.length - 1)], x, y)
                this.tiles[x][y] = tile;
                index++;
            }
        }
    }

    showField() {

        var window = document.querySelector(".window");
        var field = document.querySelector("table");
        if (field) {
            window.removeChild(field);
        }
        field = document.createElement("table");
        var tr = "", td = "", tile = "";
        for (var x = 0; x < this.n; x++) {
            tr = document.createElement("tr");
            for (var y = 0; y < this.m; y++) {
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

        for (var tile of this.group) {
            tile.setColor("blank");
        }
        this.clearGroup();
    }

    moveTiles() {

    }

    checkCoordinates(x, y) {

        if (x < 0 || y < 0 || x >= this.n || y >= this.m) {
            return false;
        }
        return true;
    }
}