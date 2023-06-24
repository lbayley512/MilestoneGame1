canvas = document.getElementById('game-canvas');
context = canvas.getContext("2d");

canvas.height = innerWidth;
canvas.height = innerHeight;

class boundary {
    constructor({position}) {
        this.posistion = position;
        this.width = 40
        this.height = 40
    }

    draw() {
        ctx.fillstyle = "blue"
        ctx.fillReact(this.posistion.x, this.posistion.y, this.width, this.height)

    }
}

const boundaries = [
    new boundary({
        position: {
            x: 0,
            y: 0
        }
    })
]
