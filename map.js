canvas = document.getElementById('game-canvas');
ctx = canvas.getContext("2d");

canvas.height = innerWidth;
canvas.height = innerHeight;
// create class for boarders
class Boundary {
    static width = 40
    static height = 40
    // give the map a position on the screen 
    constructor({position}) {
        this.posistion = position;
        this.width = 40
        this.height = 40
    }
    // draw out the boundaries
    draw() {
        ctx.fillstyle = 'black'
        ctx.fillRect(this.posistion.x, this.posistion.y, this.width, this.height)

    }
}
// cerate player class
class Player {
    //give the player position, velocity and size
    constructor({position, velocity}){
        this.position = position 
        this.velocity = velocity 
        this.radius = 15
    }
    // draw the player in the staring position
    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2 )
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
    }
    // draw the player in the new position
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
// track the last key that was pressed for better movment control
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
// creat the map layout
const map = [
    ['-','-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-','-',' ','-'],
    ['-',' ','-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-','-']
]

const boundaries = []
// create the player
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
// change the "-" to represent the boundary squar
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol){
            case '-': 
            // switch the symbol while giveing it the correct position
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

// animation loop to update and display the player movement
function animate() {
    requestAnimationFrame(animate)
    // clear the frames from shwoing the previous position
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw()
        // adding collioson
        if (player.position.y - player.radius <= boundary.position.y + boundary.height && player.position.x + player.radius >= boundary.position.x && player.position.y + player.radius >= boundary.position.y && player.position.x - player.radius <= boundary.position.x + boundary.width){
            console.log("we are colliding!")
        }
    })
    player.update()
    //set intitial velocity to 0
    player.velocity.y = 0
    player.velocity.x = 0
    
    // adding character interaction 
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





// key control
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