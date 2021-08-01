const colors = ['blue', 'green', 'red', 'yellow', 'purple'];
field = new Field(9, 9)
window.onload = field.createField()

function getRandom(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickedOnTile(x, y) {

    var tile = field.tiles[x][y];
    console.log("clicked on tile(" + tile.x + ", " + tile.y + ") with color " + tile.color);
}

