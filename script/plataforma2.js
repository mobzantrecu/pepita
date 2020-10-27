//MEDIDAS DEL CANVAS
var canWidth =  window.innerWidth * 0.7;
var canHeight = window.innerHeight * 0.8;

var sheetWidth = 938;
var sheetHeight= 680;
// The attributes of the player.

var defaultPlayerValues = {
    x: 25,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 20,
    width: 20
    };

var player = {...defaultPlayerValues};
// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
    };
let enemies = [{
    x:100,
    y:150,
    width:30,
    height:30
},
{
    x:400,
    y:150,
    width:30,
    height:30
},
{
    x:300,
    y:250,
    width:30,
    height:30
},
{
    x:225,
    y:200,
    width:30,
    height:30
},
{
    x:525,
    y:200,
    width:30,
    height:30
},
{
    x:620,
    y:250,
    width:30,
    height:30
},
{
    x:750,
    y:220,
    width:30,
    height:30
}];
let side = 'right'
// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;
// The number of platforms
var num = 5;
// The platforms
var platforms = [];
// Function to render the canvas
function rendercanvas(){
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, sheetWidth, sheetHeight);
}
// Function to render the player

function renderEnemies(){
    ctx.fillStyle = "#F08080";
    enemies.forEach( enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    })
}

function restartPosition(){
    console.log(defaultPlayerValues)
    player = {...defaultPlayerValues};
}

function renderplayer(movement){
    pepita = new Image();
    pepita.src = `img/pepita_${movement}.png`;
    // ctx.fillStyle = "#F08080";
    ctx.drawImage(pepita, (player.x)-20, (player.y)-20, player.width, player.height);
    // ctx.fillRect(pepita,(player.x)-20, (player.y)-20, player.width, player.height);
    }
// Function to create platforms
function createplat(){
    platforms.push(
        {
            x: 0,
            y: 200,
            width: 200,
            height: 15
        },
        {
            x: 100,
            y: 300,
            width: 200,
            height: 15
        },
        {
            x: 300,
            y: 200,
            width: 200,
            height: 15
        },
        {
            x: 550,
            y: 300,
            width: 200,
            height: 15
        },
        {
            x: 700,
            y: 250,
            width: 200,
            height: 15
        }
    );

    }
// Function to render platforms
function renderplat(){
    ctx.fillStyle = "#45597E";
    platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    })
}
// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(player.jump == false) {
            player.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
} 
function loop() {
    // If the player is not jumping apply the effect of frictiom
    if(player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        player.x_v = -2.5;
    }
    if(keys.right) {
        player.x_v = 2.5;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collions with the platform
    let i = -1;
    platforms.forEach((platform,index) => {
        if(platform.x < player.x && player.x < platform.x + platform.width &&
            platform.y < player.y && player.y < platform.y + platform.height){
            i = index;
            console.log("ESTA EN LA PLATAFORMA " + index)
        }
    })

    enemies.forEach(enemy => {
        if(player.x > enemy.x && player.x < enemy.x + enemy.width && 
            player.y > enemy.y && player.y < enemy.y + enemy.width){
            restartPosition();
            console.log("TOCO AL ENEMIGO")
        }
    });

    if(player.x < 0 || player.x > 0 + canvas.width && 
        player.y < 0 || player.y > 0 + canvas.width){
        restartPosition();
        console.log("SALIO DEL CANVAS")
    }

    if (i > -1){
        player.jump = false;
        player.y = platforms[i].y;    
    }
    // Rendering the canvas, the player and the platforms
    if(keys.left || (keys.left && keys.up)) side = 'left'
    if(keys.right || (keys.right && keys.up)) side = 'right'

    rendercanvas();
    renderEnemies();
    renderplayer(side);
    renderplat();
}
canvas=document.getElementById("canvasPlataforma");
ctx=canvas.getContext("2d");
ctx.canvas.height = canHeight;
ctx.canvas.width = canWidth;
createplat();
// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,22);