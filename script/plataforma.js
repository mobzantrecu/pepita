
//MEDIDAS DEL CANVAS
var canWidth =  window.innerWidth * 0.7;
var canHeight = window.innerHeight * 0.8;

//ARRANCA EN POSICION
var x= 0;
var y= 0;

//POR DEFECTO TODO EN FALSO
var left = false;
var up = false;
var down = false;

//LAS POSICIONES DE CADA MOVIMIENTO EN Y
var trackLeft = 2;
var trackRight = 1;
var trackUp = 0;
var trackDown = 3;

var srcX;
var srcY;

//TAMAÑO DEL TOTAL DEL LIENZO DE PEPITA
var sheetWidth = 938;
var sheetHeight= 680;

var cols = 8;
var rows = 4;

var width = sheetWidth / cols; 
var height = sheetHeight / rows; 

var currentFrame = 0;

//SE DIBUJA A PEPITA
var character = new Image()
character.src = "img/character.png";

//ASIGNO VALORES AL CANVAS
var canvas = document.getElementById("canvas");
canvas.width = canWidth;
canvas.height= canHeight;
canvas.style.background = "pink"
canvas.style.backgroundImage = 'url("img/fondo.jpg")'
canvas.style.backgroundSize = 'cover'
var ctx= canvas.getContext("2d")

//LAS FUNCIONES DE MOVIMIENTO, PRIMERO ELIMINA TODO LO QUE ESTE EN EL CANVAS, LUEGO LE DA VALORES DEPENDIENDO PARA DONDE MOVER, DESPUES SE MUEVE TANTA CANTIDAD DE PIXELES
function moveRight(){
    ctx.clearRect(x, y, width, height);
    left = false;
    up = false;
    down = false;
    x+=20;
    
}

function moveLeft(){
    ctx.clearRect(x, y, width, height);
    left = true;
    up = false;
    down = false;
    x-=20;            
}

function moveDown(){
    ctx.clearRect(x, y, width, height);
    up = false;
    left= false;
    down = true;
    y+=20;            
}
function moveUp(){
    ctx.clearRect(x, y, width, height);
    up= true;
    left = false;
    down = false;
    y-=20;            
}

//LA FUNCION QUE ACTUALIZA CONSTANTEMENTE TODO, PRIMERO BORRA TODO EL CANVAS, DESPUES DIVIDE LOS FRAMES POR LA CANTIDAD DE MOVIMIENTOS EN X, INDICA EN QUE POSICION DE X ESTA LA IMG, Y DEPENDIENDO DE LOS VALORES DEL MOVIMIENTO INDICA T O F
function updateFrame(){
    
    ctx.clearRect(x, y, width, height);
    currentFrame = ++currentFrame % cols;
    srcX = currentFrame * width;

    if(left == true & up == false & down == false){
    srcY = trackLeft * height;
        }
    if(up == true & left == false & down == false ){
    
    srcY = trackUp * height;
        }

    if(up == false & left == false & down == false){
    srcY = trackRight * height;
        }

    if(up == false & left == false & down == true){
    srcY = trackDown * height;
        }
    
    
}

//LA FUNCION QUE DIBUJA EL CANVAS
function drawImage(){
    updateFrame();
    ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height)
}

//DIBUJA EL CANVAS CADA TANTOS INTERVALOS
setInterval(function(){
    drawImage();
}, 100);


//SETEO DEL TECLADO
document.addEventListener("keydown", (e) => {
e.preventDefault();

switch (e.key) {
// Arriba
case "ArrowUp":
case "w":
case "W":
        moveUp()

break;
// Abajo
case "ArrowDown":
case "s":
case "S":
    moveDown()

break;
// Izquierda
case "ArrowLeft":
case "a":
case "A":
    moveLeft()
break;

// Derecha
case "ArrowRight":
case "d":
case "D":
    moveRight()
break;

default:
    break;
}
})




