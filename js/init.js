const colors = ['blue', 'green', 'red', 'yellow', 'purple'];
field = new Field(9, 9);
window.onload = field.createField();
field.showField();

function getRandom(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickedOnTile(x, y) {

    var tile = field.getTile(x, y);
    if (!tile.isEmpty()) {
        field.setNeededColor(tile.getColor());
        field.findGroup(x, y);
        if (field.getGroup().size >= field.getMinGroupLength()){
            field.removeGroup();
            field.showField();
            // field.moveTiles();
        } else {
            field.clearGroup();
        }
    }
}

