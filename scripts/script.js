// Canvas setup
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var resolution = 8;
canvas.width *= resolution;
canvas.height *= resolution;

var cameraOffsetX = 0;
var cameraOffsetY = 0;

// Functions
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Werewolf class
class ScaryWerewolf {
    constructor () {
        // Initialize the werewolf's properties
        this.x = 0;
        this.y = 0;

        this.xDirection = 0;
        this.yDirection = 0;

        this.speed = 6;

        this.texture = new Image();
        this.texture.src = "content/images/scary-werewolf.jpg";
        
        const scaleFactor = 0.4;
        // Set up the werewolf's size and initial camera position
        this.texture.onload = () => {
            this.width = this.texture.width * scaleFactor;
            this.height = this.texture.height * scaleFactor;

            cameraOffsetX = this.x - canvas.width / 2;
            cameraOffsetY = this.y - canvas.height / 2;

            initializeProps();
        }
    }

    // Check if the werewolf collides with an object using Axis-Aligned Bounding Box collision detection.
    checkAABBCollision(object) {
        return (
            this.x - this.width / 2 < object.x + object.width / 2 &&
            this.x + this.width / 2 > object.x - object.width / 2 &&
            this.y - this.height / 2 <object.y + object.height / 2 &&
            this.y + this.height / 2 >object.y - object.height / 2
        );
    }

    // Update the werewolf's position
    update(props) {
        let x = this.x + this.xDirection * this.speed;
        let y = this.y + this.yDirection * this.speed;
        
        let xCollided = false;
        let yCollided = false;
        
        props.forEach(prop => {
            // Check for horizontal collision
            if (
                x - this.width / 2 < prop.x + prop.width / 2 &&
                x + this.width / 2 > prop.x - prop.width / 2 &&
                this.y - this.height / 2 < prop.y + prop.height / 2 &&
                this.y + this.height / 2 > prop.y - prop.height / 2
            ) {
                xCollided = true;
            }
            
            // Check for vertical collision
            if (
                this.x - this.width / 2 < prop.x + prop.width / 2 &&
                this.x + this.width / 2 > prop.x - prop.width / 2 &&
                y - this.height / 2 < prop.y + prop.height / 2 &&
                y + this.height / 2 > prop.y - prop.height / 2
            ) {
                yCollided = true;
            }
        });
    
        // Handle horizontal movement
        if (!xCollided) {
            this.x = x;
            cameraOffsetX = this.x - canvas.width / 2;
        }
        
        // Handle vertical movement
        if (!yCollided) {
            this.y = y;
            cameraOffsetY = this.y - canvas.height / 2;
        }
    }    

    // Draw the werewolf on the canvas
    draw(ctx) {
        let xScreenPosition = this.x - cameraOffsetX - (this.width / 2);
        let yScreenPosition = this.y - cameraOffsetY - (this.height / 2);
        ctx.drawImage(this.texture, xScreenPosition, yScreenPosition, this.width, this.height);
    }
}

// Props class
class Prop {
    constructor (x, y, height, width, color) {
        // Initialize prop properties
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // Draw the prop on the canvas
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - cameraOffsetX - this.width / 2, this.y - cameraOffsetY - this.height / 2  , this.width, this.height);
    }
}

// Setup werewolf
var werewolf = new ScaryWerewolf();

// Function to initialize props and check for collisions
var props = []
function initializeProps() {
    for (let i = 0; i < 50; i++) {
        // Create and add random props to the list
        let x = Math.floor(randomInteger(-canvas.width / 2 / 50, canvas.width / 2 / 50)) * 50;
        let y = Math.floor(randomInteger(-canvas.height / 2 / 50, canvas.height / 2 / 50)) * 50;

        let prop = new Prop(x, y, 50, 50, "orange");
        if (!werewolf.checkAABBCollision(prop)) {
            props.push(prop);
        }
    }
}

// Gameloop
window.requestAnimationFrame(gameLoop);

function gameLoop() {
    // Clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw all props
    props.forEach(prop => {
        prop.draw(ctx);
    });
    
    // Update and draw the werewolf
    werewolf.update(props);
    werewolf.draw(ctx);
    
    // Request the next frame
    window.requestAnimationFrame(gameLoop);
}

// Key events
document.addEventListener("keydown", (event) => {
    var key = event.key;

    // Handle key presses to control the werewolf's movement
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

    // Stop the werewolf's movement when the keys are released
    if (key === "z" || key == "s") {
        werewolf.yDirection = 0;
    } else if (key == "q" || key == "d") {
        werewolf.xDirection = 0;
    }
})
