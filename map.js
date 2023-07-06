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

class Ghost {
    //give the ghost position, velocity and size
    static speed = 2
    constructor({position, velocity, color = 'red'}){
        this.position = position 
        this.velocity = velocity 
        this.radius = 15
        this.color = color
        // previous collisions to help with movement
        this.prevCollisions = []
        this.speed = 2
    }
    // draw the ghost in the staring position
    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2 )
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    // draw the ghost moving
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Point {
    //give the dot position, velocity and size
    constructor({position}){
        this.position = position 
        this.radius = 3
    }
    // draw the dot in the staring position
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
const ghosts = [new Ghost({
    position: {
        x: 40 * 5 + 40/2,
        y: 40 * 4 + 40/2
    },
    velocity: {
        x: Ghost.speed,
        y: 0
    }
})]

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
            // switch the symbol while giving it the correct position
            boundaries.push(new Boundary({
                position: {
                    x: Boundary.width * j,
                    y: Boundary.height * i,
                }
            }))
            break
            case ' ': 
            // switch the symbol while giving it the correct position
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
    const padding = Boundary.width/2 -circle.radius - 1
    return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
}

let animateId 
// animation loop to update and display the player movement
function animate() {
    animationId = requestAnimationFrame(animate)
    // clears the tracer behind the moving charcter
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // moves player, last key allows other directions to occer while holding down a key
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
    // draw the points
    point.draw()
    // add collisions with points and player
    if (Math.hypot(point.position.x - player.position.x, point.position.y - player.position.y) < point.radius + player.radius) {
        console.log("touching")
        points.splice(i,1)
    }

})

    boundaries.forEach((boundary) => {
        // drawing boundaries
        boundary.draw()
        // making player stop if it collides with boundary
        if (collision({circle: player, rectangle: boundary})){
            console.log("we are colliding!")
            player.velocity.y = 0
            player.velocity.x = 0
        }
    })

    player.update()
    player.velocity.y = 0
    player.velocity.x = 0

    ghosts.forEach(ghost => {
        // adding collision and losing screen with the ghost
        ghost.update()
        if (Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) < ghost.radius + player.radius) {
            console.log("You Lose")
            cancelAnimationFrame(animationId)
            window.open("lose.html")
            
        }
        // creating win 
        if (points.length == 0){
            console.log("You Win!")
            cancelAnimationFrame(animationId)
            window.open("win.html")
        }
        // creating ghost movement
        const collisions = []
        boundaries.forEach((boundary) => {

            if (
                !collisions.includes('right') &&
                collision({circle: {
                ...ghost, 
                velocity: {
                    x: ghost.speed,
                    y: 0
                }
            },
            rectangle: boundary
        }) )
            {
                collisions.push('right')
            }
            if (!collisions.includes('left') &&
                collision({circle: {
                ...ghost, 
                velocity: {
                    x: -ghost.speed,
                    y: 0
                }
            },
            rectangle: boundary
        }) )
            {
                collisions.push('left')
            }
            if (!collisions.includes('up') &&
                collision({circle: {
                ...ghost, 
                velocity: {
                    x: 0,
                    y: -ghost.speed
                }
            },
            rectangle: boundary
        }) )
            {
                collisions.push('up')
            }
            if (!collisions.includes('down') &&
                collision({circle: {
                ...ghost, 
                velocity: {
                    x: 0,
                    y: ghost.speed
                }
            },
            rectangle: boundary
        }) )
            {
                collisions.push('down')
            }
        })
        
        // tracking previos collisions 
        if(collisions.length > ghost.prevCollisions.length ){ 
        ghost.prevCollisions = collisions
        }

        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            // push the pre collision into the array 
            if (ghost.velocity.x > 0) {ghost.prevCollisions.push('right')}
            else if (ghost.velocity.x < 0) {ghost.prevCollisions.push('left')}
            else if (ghost.velocity.y  < 0) {ghost.prevCollisions.push('up')}
            else if (ghost.velocity.y > 0) {ghost.prevCollisions.push('down')}
            // track the path that there is no collision
            const pathways = ghost.prevCollisions.filter(collision => {
                return !collisions.includes(collision)

            })
           // generate a random path
            const direction = pathways[Math.floor(Math.random() * pathways.length)]
           
            // change the ghost velocioty/direction based on direction var
            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'right': 
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break
                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
                    break
            }

            ghost.prevCollisions = []
        }
         
    })

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