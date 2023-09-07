// Canvas setup
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var resolution = 8
canvas.width *= resolution
canvas.height *= resolution

var cameraOffsetX = 0;
var cameraOffsetY = 0;

// Functions
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Werewolf class
class ScaryWerewolf {
    constructor () {
        this.x = 0;
        this.y = 0;

        this.xDirection = 0;
        this.yDirection = 0;

        this.speed = 8;

        this.texture = new Image();
        this.texture.src = "content/images/scary-werewolf.jpg";
    
        this.scaleFactor = .4
    }

    update() {
        this.x += this.xDirection * this.speed;
        this.y += this.yDirection * this.speed;
        
        cameraOffsetX = this.x - canvas.width  / 2
        cameraOffsetY = this.y - canvas.height / 2 
    }

    draw(ctx) {
        ctx.drawImage(this.texture, this.x - cameraOffsetX - (this.texture.width * this.scaleFactor / 2), this.y - cameraOffsetY - (this.texture.height * this.scaleFactor / 2), this.texture.width * this.scaleFactor, this.texture.height * this.scaleFactor);
    }
}

// Props class
class Prop {
    constructor (x, y, height, width, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - cameraOffsetX - this.width / 2, this.y - cameraOffsetY - this.height / 2  , this.width, this.height);
    }
}

// Setup player and props
var werewolf = new ScaryWerewolf;
var props = []
for (let i = 0; i < 50; i++) {
    props.push(new Prop(randomInteger(-canvas.width / 2, canvas.width / 2), randomInteger(-canvas.height / 2, canvas.height / 2), 50, 50, "orange"))
}

// Gameloop
window.requestAnimationFrame(gameLoop);

function gameLoop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    werewolf.update();
    werewolf.draw(ctx);
    
    props.forEach(prop => {
        prop.draw(ctx);
    });
    
    window.requestAnimationFrame(gameLoop);
}

// Key events
document.addEventListener("keydown", (event) => {
    var key = event.key;

    switch (key) {
        case "z":
            werewolf.yDirection = -1;
            break;

        case "s":
            werewolf.yDirection = 1;
            break;

        case "q":
            werewolf.xDirection = -1;
            break;

        case "d":
            werewolf.xDirection = 1;
            break;
    }
})

document.addEventListener("keyup", (event) => {
    var key = event.key;

    if (key === "z" || key == "s") {
        werewolf.yDirection = 0;
    } else if (key == "q" || key == "d") {
        werewolf.xDirection = 0;
    }
})