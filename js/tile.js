class Tile {
    
    constructor(index, color, x, y) {
        
        this.index = index;
        this.color = color;
        this.x = x;
        this.y = y;
        this.shift = 0;
    }

    getIndex() {
        return this.index;
    }

    getColor() {
        return this.color;
    }
    
    setColor(color) {
        this.color = color;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    isEmpty() {
        if (this.color == "blank") {
            return true;
        }
        return false;
    }
}