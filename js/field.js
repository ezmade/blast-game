class Field {
    
    constructor(n, m) {

        this.n = n;
        this.m = m;
        this.tiles = [];
        this.groups = [];
    }

    createField() {

        var done = false;
        while (!done) {
            var index = 0;
            for (var x = 0; x < this.n; x++) {
                this.tiles[x] = [];
                for (var y = 0; y < this.m; y++) {
                    var tile = new Tile(index, colors[getRandom(0, colors.length - 1)], x, y)
                    this.tiles[x][y] = tile;
                    index++;
                }
            }
            this.findGroups();
            if (this.groups.length > 0) {
                done = true;
            }
        }
        this.showField(field)
    }

    findGroups() {

        this.groups = [];
        // Группы тайлов по вертикали
        for (var x = 0; x < this.n; x++) {
            var groupLength = 1;
            for (var y = 0; y < this.m; y++) {
                var isGroup = false;
                if (y == this.m - 1) {
                    isGroup = true;
                } else {
                    if (this.tiles[x][y].color == this.tiles[x][y+1].color &&
                        this.tiles[x][y].color != "blank") {
                        groupLength += 1;
                    } else {
                        isGroup = true;
                    }
                }
                if (isGroup) {
                    if (groupLength >= 3) {
                        this.groups.push({ x: x, 
                                        y: y + 1 - groupLength,
                                        len: groupLength, 
                                        horizontal: false });
                    }

                    groupLength = 1;
                }
            }
        }
        // Группы тайлов по горизонтали
        for (var y = 0; y < this.m; y++) {
            var groupLength = 1;
            for (var x = 0; x < this.n; x++) {
                var isGroup = false;
                if (x == this.n - 1) {
                    isGroup = true;
                } else {
                    if (this.tiles[x][y].color == this.tiles[x+1][y].color &&
                        this.tiles[x][y].color != "blank") {
                        groupLength += 1;
                    } else {
                        isGroup = true;
                    }
                }

                if (isGroup) {
                    if (groupLength >= 3) {
                        this.groups.push({ x: x+1-groupLength, 
                                        y: y,
                                        len: groupLength, 
                                        horizontal: true });
                    }

                    groupLength = 1;
                }
            }
        }
    }

    showField(field) {
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
                tile.style.background = "URL('./assets/img/" + this.tiles[x][y].color + ".png') no-repeat";
                tile.style.backgroundSize = "cover";
                td.appendChild(tile);
                tr.appendChild(td);
            }
            field.appendChild(tr);
        }
        window.appendChild(field);
    }
}