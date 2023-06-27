canvas = document.getElementById('game-canvas');
ctx = canvas.getContext("2d");

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
}

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

player.draw()

window.addEventListener('keydown', (event) => {
    console.log(event)
})