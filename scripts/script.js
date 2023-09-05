// Canvas setup
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var resolution = 8
canvas.width *= resolution
canvas.height *= resolution

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
    }

    update() {
        this.x += this.xDirection * this.speed;
        this.y += this.yDirection * this.speed;
    }

    draw(ctx) {
        var scaleFactor = 0.4;
        ctx.drawImage(this.texture, this.x, this.y, this.texture.width * scaleFactor, this.texture.height * scaleFactor);
    }
}

// Gameloop
window.requestAnimationFrame(gameLoop);
werewolf = new ScaryWerewolf;

function gameLoop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    werewolf.update();
    werewolf.draw(ctx);

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