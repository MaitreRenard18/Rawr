var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var resolution = 8
canvas.width *= resolution
canvas.height *= resolution

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

    draw(ctx) {
        var scaleFactor = 0.4;
        ctx.drawImage(this.texture, this.x, this.y, this.texture.width * scaleFactor, this.texture.height * scaleFactor)
    }
}

window.requestAnimationFrame(gameLoop);
werewolf = new ScaryWerewolf;

function gameLoop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    werewolf.x += werewolf.xDirection * werewolf.speed;
    werewolf.y += werewolf.yDirection * werewolf.speed;
    werewolf.draw(ctx)

    window.requestAnimationFrame(gameLoop);
}

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