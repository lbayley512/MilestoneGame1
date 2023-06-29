canvas = document.getElementById('game-canvas');
ctx = canvas.getContext("2d");

canvas.height = innerWidth;
canvas.height = innerHeight;

class Boundary {
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

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let lastkey = ''

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
            boundaries.push(new Boundary({
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

        if (player.position.y - player.radius <= Boundary.position.y + Boundary.height && player.position.x + player.radius >= Boundary.position.x && player.position.y + player.radius >= Boundary.position.y && player.position.x - player.radius <= Boundary.position.x + Boundary.width){
            console.log("we are colliding!")
        }
    })
    player.update()
    player.velocity.y = 0
    player.velocity.x = 0
    
    
    if (keys.w.pressed && lastkey === 'w') {
        player.velocity.y = -5
    }
    else if (keys.a.pressed && lastkey === 'a'){
        player.velocity.x = -5
    }
    else if (keys.s.pressed && lastkey === 's'){
        player.velocity.y = 5
    }
    else if (keys.d.pressed && lastkey === 'd'){
        player.velocity.x = 5
    }
}

animate()






addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }

})

addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }

})