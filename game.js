canvas = document.getElementById('game-canvas');
ctx = canvas.getContext("2d");

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
        ctx.fillRect(this.posistion.x, this.posistion.y, this.width, this.height)

    }
}

const map = [
    ['-','-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-','-',' ','-'],
    ['-',' ','-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-','-']
]

const boundaries = []

boundaries.forEach((boundary) => {
    boundary.draw()
})

