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
        this.position = position;
        this.width = 40
        this.height = 40
    }
    // draw out the boundaries
    draw() {
        ctx.fillstyle = 'black'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

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

class Point {
    //give the player position, velocity and size
    constructor({position}){
        this.position = position 
        this.radius = 3
    }
    // draw the player in the staring position
    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2 )
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
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
    ['-',' ','-',' ',' ','-',' ','-'],
    ['-',' ','-',' ',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-','-']
]
const points = []
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
                    x: Boundary.width * j,
                    y: Boundary.height * i,
                }
            }))
            break
            case ' ': 
            // switch the symbol while giveing it the correct position
            points.push(new Point({
                position: {
                    x: j * Boundary.width + Boundary.width/2, 
                    y: i * Boundary.height +Boundary.height/2
                }
            }))
            break
        }
    })
})
// adding collioson
function collision ({circle, rectangle}){ 
    return circle.position.y - circle.radius + player.velocity.y <= rectangle.position.y + rectangle.height && circle.position.x + circle.radius + player.velocity.x >= rectangle.position.x && circle.position.y + circle.radius + player.velocity.y >= rectangle.position.y && circle.position.x - circle.radius + player.velocity.x <= rectangle.position.x + rectangle.width
}
// animation loop to update and display the player movement
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    
points.forEach((point, i) => {
    point.draw()
    if (Math.hypot(point.position.x - player.position.x, point.position.y - player.position.y) < point.radius + player.radius) {
        console.log("touching")
        points.splice(i,1)
    }

})

    boundaries.forEach((boundary) => {
        boundary.draw()
        
        if (collision({circle: player, rectangle: boundary})){
            console.log("we are colliding!")
            player.velocity.y = 0
            player.velocity.x = 0
        }
    })

    player.update()
    player.velocity.y = 0
    player.velocity.x = 0
    
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