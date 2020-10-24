
//MEDIDAS DEL CANVAS
let canWidthUno =  window.innerWidth * 0.7;
let canHeightUno = window.innerHeight * 0.8;

//ARRANCA EN POSICION
var xUno= 0;
var yUno= 0;

//POR DEFECTO TODO EN FALSO
var leftUno = false;
var upUno = false;
var downUno = false;

//LAS POSICIONES DE CADA MOVIMIENTO EN Y
var trackLeftUno = 2;
var trackRightUno = 1;
var trackUpUno = 0;
var trackDownUno = 3;

var srcXUno;
var srcYUno;

//TAMAÑO DEL TOTAL DEL LIENZO DE PEPITA
var sheetWidthUno = 938;
var sheetHeightUno= 680;

var colsUno = 8;
var rowsUno = 4;

var widthUno = sheetWidthUno / colsUno; 
var heightUno = sheetHeightUno / rowsUno; 

var currentFrameUno = 0;

//SE DIBUJA A PEPITA
var characterUno = new Image()
characterUno.src = "img/character.png";



//ASIGNO VALORES AL CANVAS
let canvasUno = document.getElementById("canvasUno");
canvasUno.width = canWidthUno;
canvasUno.height= canHeightUno;
canvasUno.style.background = "blue"
canvasUno.style.backgroundImage = 'url("img/lab1/fondoAzulito.jpg")'
canvasUno.style.backgroundSize = 'cover'
let ctxUno= canvasUno.getContext("2d")


//LAS FUNCIONES DE MOVIMIENTO, PRIMERO ELIMINA TODO LO QUE ESTE EN EL CANVAS, 
//LUEGO LE DA VALORES DEPENDIENDO PARA DONDE MOVER, DESPUES SE MUEVE TANTA CANTIDAD DE PIXELES
function moveRightUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    leftUno = false;
    upUno = false;
    downUno = false;
    xUno+=20;
    
}

function moveLeftUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    leftUno = true;
    upUno = false;
    downUno = false;
    xUno-=20;            
}

function moveDownUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    upUno = false;
    leftUno= false;
    downUno = true;
    yUno+=20;            
}
function moveUpUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    upUno= true;
    leftUno = false;
    downUno = false;
    yUno-=20;            
}

//LA FUNCION QUE ACTUALIZA CONSTANTEMENTE TODO, PRIMERO BORRA TODO EL CANVAS, 
//DESPUES DIVIDE LOS FRAMES POR LA CANTIDAD DE MOVIMIENTOS EN X, INDICA EN QUE 
//POSICION DE X ESTA LA IMG, Y DEPENDIENDO DE LOS VALORES DEL MOVIMIENTO INDICA T O F
function updateFrameUno(){
    
    ctxUno.clearRect(x, y, width, height);
    currentFrameUno = ++currentFrameUno % colsUno;
    srcXUno = currentFrameUno * widthUno;

    if(leftUno == true & upUno == false & downUno == false){
    srcYUno = trackLeftUno * heightUno;
        }
    if(upUno == true & leftUno == false & downUno == false ){
    
    srcYUno = trackUpUno * heightUno;
        }

    if(upUno == false & leftUno == false & downUno == false){
    srcYUno = trackRightUno * heightUno;
        }

    if(upUno == false & leftUno == false & downUno == true){
    srcYUno = trackDownUno * heightUno;
        }
    
    
}

//LA FUNCION QUE DIBUJA EL CANVAS
function drawImageUno(){
    updateFrameUno();
    ctxUno.drawImage(characterUno, srcX, srcY, width, height, x, y, width, height)
}

//DIBUJA EL CANVAS CADA TANTOS INTERVALOS
setInterval(function(){
    drawImageUno();
}, 100);


//SETEO DEL TECLADO
document.addEventListener("keydown", (e) => {
e.preventDefault();

switch (e.key) {
// Arriba
case "ArrowUp":
case "w":
case "W":
    moveUpUno()

break;
// Abajo
case "ArrowDown":
case "s":
case "S":
    moveDownUno()

break;
// Izquierda
case "ArrowLeft":
case "a":
case "A":
    moveLeftUno()
break;

// Derecha
case "ArrowRight":
case "d":
case "D":
    moveRightUno()
break;

default:
    break;
}
})




