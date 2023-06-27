canvas = document.getElementById('game-canvas');
ctx = canvas.getContext("2d");

canvas.height = innerWidth;
canvas.height = innerHeight;

class boundary {
    static width = 40
    static height = 40
    constructor({position}) {
        this.posistion = position;
        this.width = 40
        this.height = 40
    }

    draw() {
        ctx.fillstyle = 'black'
        ctx.fillRect(this.posistion.x, this.posistion.y, this.width, this.height)

    }
}

class Player {
    constructor({position, velocity}){
        this.position = position 
        this.velocity = velocity 
        this.radius = 15
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2 )
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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
const player = new Player({
    position: {
        x: 40 + 40/2,
        y: 40 + 40/2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol){
            case '-': 
            boundaries.push(new boundary({
                position: {
                    x: 40 * j,
                    y: 40 * i,
                }
            }))
            break
        }
    })
})

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.update()
}

animate()






addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            player.velocity.y = -5
            break
        case 'a':
            player.velocity.x = -5
            break
        case 's':
            player.velocity.y = 5
            break
        case 'd':
            player.velocity.x = 5
            break
    }
    console.log(player.velocity)
})
