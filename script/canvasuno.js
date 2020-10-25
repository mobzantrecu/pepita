
//MEDIDAS DEL CANVAS
//CAMBIA AL TAMAÑO DEL CANVAS CADA VEZ QUE CAMBIA DE TAMAÑO LA PANTALLA

function resizeCanvas() {
    canvasUno.width =  window.innerWidth * 0.7;;
    canvasUno.height= window.innerHeight * 0.8;
}
window.addEventListener("resize", resizeCanvas)


//ASIGNO VALORES AL CANVAS
let canvasUno = document.getElementById("canvasUno");

canvasUno.width =  window.innerWidth * 0.7;
canvasUno.height= window.innerHeight * 0.8;

canvasUno.style.background = "blue"
canvasUno.style.backgroundImage = 'url("img/lab1/fondoAzulito.jpg")';
canvasUno.style.backgroundSize = 'cover';
let ctxUno= canvasUno.getContext("2d")

//ARRANCA EN POSICION
let xUno= 0;
let yUno= 0;

//POR DEFECTO TODO EN FALSO
let leftUno = false;
let upUno = false;
let downUno = false;

//LAS POSICIONES DE CADA MOVIMIENTO EN Y
let trackLeftUno = 2;
let trackRightUno = 1;
let trackUpUno = 0;
let trackDownUno = 3;

let srcXUno;
let srcYUno;

//TAMAÑO DEL TOTAL DEL LIENZO DE PEPITA
let sheetWidthUno = 938;
let sheetHeightUno= 680;

let colsUno = 8;
let rowsUno = 4;

let widthUno = sheetWidthUno / colsUno; 
let heightUno = sheetHeightUno / rowsUno; 

let currentFrameUno = 0;

//SE DIBUJA A PEPITA
let characterUno = new Image()
characterUno.src = "img/character.png";

let velocidad = 20;

// las colisiones siempre estan en falso 

let colisionaRight = false;
let colisionaLeft = false;
let colisionaUp = false;
let colisionaDown = false;

// y cuando estan en true es que no se pueden mover

function colisiona() {
    if (xUno <= 0) {
        colisionaLeft = true;
    }
    if (xUno + widthUno >= canvasUno.width) {
        colisionaRight = true;
    } 
    if (yUno <= 0) {
        colisionaUp = true;
    } 
    if (yUno + heightUno >= canvasUno.height) {
        colisionaDown = true;
    }
}

//LAS FUNCIONES DE MOVIMIENTO, PRIMERO ELIMINA TODO LO QUE ESTE EN EL CANVAS, 
//LUEGO LE DA VALORES DEPENDIENDO PARA DONDE MOVER, DESPUES SE MUEVE TANTA CANTIDAD DE PIXELES
function moveRightUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    leftUno = false;
    upUno = false;
    downUno = false;

    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaRight) {
        xUno+=velocidad;
        colisionaDown = false;
        colisionaUp = false;
        colisionaLeft = false;
    }
}

function moveLeftUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    leftUno = true;
    upUno = false;
    downUno = false;
    
    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaLeft) {
        xUno-=velocidad;
        colisionaRight = false;
        colisionaUp = false;
        colisionaDown = false;
    }
               
}

function moveDownUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    upUno = false;
    leftUno= false;
    downUno = true;   
    
    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaDown) {
        yUno+=velocidad;
        colisionaRight = false;
        colisionaUp = false;
        colisionaLeft = false;
    }
}
function moveUpUno(){
    ctxUno.clearRect(xUno, yUno, widthUno, heightUno);
    upUno= true;
    leftUno = false;
    downUno = false;
    
    // esto revisa si la colision es falsa y si lo es habilita el movimiento

    if (!colisionaUp) {
        yUno-=velocidad;
        colisionaRight = false;
        colisionaDown = false;
        colisionaLeft = false;
    }
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
    
    srcYUno = trackDownUno * heightUno;
        }

    if(upUno == false & leftUno == false & downUno == false){
    srcYUno = trackRightUno * heightUno;
        }

    if(upUno == false & leftUno == false & downUno == true){
    srcYUno = trackUpUno * heightUno;
        }

}

//LA FUNCION QUE DIBUJA EL CANVAS
function drawImageUno(){
    updateFrameUno();
    ctxUno.drawImage(characterUno, srcXUno, srcYUno, widthUno, heightUno, xUno, yUno, widthUno, heightUno)
}

//DIBUJA EL CANVAS CADA TANTOS INTERVALOS
setInterval(function(){
    drawImageUno();
   drawAsteroide()
   
}, 100);


//SETEO DEL TECLADO
document.addEventListener("keydown", (e) => {
e.preventDefault();

switch (e.key) {
// Arriba
case "ArrowUp":
case "w":
case "W":
    colisiona()
    moveUpUno()
break;
// Abajo
case "ArrowDown":
case "s":
case "S":
    colisiona()
    moveDownUno()
break;
// Izquierda
case "ArrowLeft":
case "a":
case "A":
    colisiona()
    moveLeftUno()
break;

// Derecha
case "ArrowRight":
case "d":
case "D":
    colisiona()
    moveRightUno()
break;

default:
    break;
}
})

  let obstaculos={
      x: [/*1*/200, 200, 200, 200, 200, 200, 200, 200,   /*2*/  0,   0,  40, 40,
       
        /*3*/ 370, 370, 370,   /*4*/  410, 450, 490, 530, 
       
        /*5*/  550, 550, 550, 550, 550, 550, 550,  /*6*/ 710, 710, 710, 710, 710, 710, 710,710,

       ],
      
        y: [/*1*/  0,  40,  80, 120, 160, 200, 240, 280, /*2*/  180, 220, 180, 220,  
       
        /*3*/  170, 210, 250,  /*4*/  280, 280, 280, 280,  
       
        /*5*/  0,  40,  80, 120, 160, 200, 240,   /*6*/ 170, 210, 250, 290, 330, 370, 410, 450,
    ]
  };

function drawAsteroide(){

  asteroide = new Image();
  asteroide.src = 'img/lab1/asteroide.png';

  nave= new Image();
  nave.src = 'img/lab1/nave.png'

  asteroide.onload = function(){
      for (let i = 0; i < obstaculos.x.length; i++) {
        ctxUno.drawImage(asteroide, obstaculos.x[i], obstaculos.y[i], 40, 40);
          
      }
      ctxUno.drawImage(nave, 415, 330, 150, 150);
   }
 


}


