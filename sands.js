const hourglass = document.getElementById("hourglass");
const sands = hourglass.getContext("2d");

const stopwatch = document.getElementById("stopwatch")
const time = stopwatch.getContext("2d");

const flipA = document.getElementById("flipA");
const flipBoth = document.getElementById("flipBoth")
const flipB = document.getElementById("flipB");

hourglass.height = 1000;
hourglass.width = 2000;

let finishedA = false;
let finishedB = false;
let critical = false;

var t = 0;
var capacityA = 4;
var capacityB = 7;
var elapsedA = 0;
var elapsedB = 0;

function drawHourglass(originX, originY, width, height, theta, max, elapsed){
    let topA = Math.sqrt((max-elapsed)/max);
    let bottomA = Math.sqrt(elapsed/max);

    //Rotation
    sands.translate(originX, originY);
    sands.rotate(theta);
    sands.translate(-originX, -originY);

    //console.log(topA);

    //Top Fill
    sands.beginPath();
    sands.moveTo(originX-topA*(width/2), originY-topA*(height/2));
    sands.lineTo(originX+topA*(width/2), originY-topA*(height/2));
    sands.lineTo(originX, originY);
    sands.closePath();
    sands.fill();

    //Bottom Fill
    sands.beginPath();
    sands.moveTo(originX-bottomA*(width/2), originY+bottomA*(height/2));
    sands.lineTo(originX+bottomA*(width/2), originY+bottomA*(height/2));
    sands.lineTo(originX, originY);
    sands.closePath();
    sands.fill();

    //Top Outline
    sands.beginPath()
    sands.moveTo(originX-width/2, originY-height/2);
    sands.lineTo(originX+width/2, originY-height/2);
    sands.lineTo(originX, originY);
    sands.closePath()
    sands.stroke()

    //Bottom Outline
    sands.beginPath()
    sands.moveTo(originX-width/2, originY+height/2);
    sands.lineTo(originX+width/2, originY+height/2);
    sands.lineTo(originX, originY);
    sands.closePath()
    sands.stroke()

    //Reset rotation
    sands.setTransform(1, 0, 0, 1, 0, 0);
}

function drawFrame(rotationA = 0, rotationB = 0){
    sands.lineWidth = 10;
    sands.fillStyle = "green";
    sands.font = "50px serif";
    sands.clearRect(0, 0, 2000, 1000);

    drawHourglass(600, 500, 300, 700, rotationA, capacityA, elapsedA);
    drawHourglass(1400, 500, 300, 700, rotationB, capacityB, elapsedB);

    //Draw time interface
    sands.fillText("Remaining: "+(capacityA-elapsedA), 100, 300);
    sands.fillText("Elapsed: "+(elapsedA), 100, 700);
    sands.fillText("Remaining: "+(capacityB-elapsedB), 1600, 300);
    sands.fillText("Elapsed: "+(elapsedB), 1600, 700);

    //Draw time
    time.clearRect(0, 0, 1000, 1000);
    time.font = "80px serif";
    time.fillStyle = "red";
    time.fillText(t, 140, 100);
}

function logicLoop(){
    //Check if at a critical point where user input is needed
    if(critical){
        //Do not let time pass until the user makes their decision
        return;
    }
    else{
        //Let 1 second pass
        if(!finishedA){elapsedA++;}
        if(!finishedB){elapsedB++;}
        t++;
        drawFrame()
        if(elapsedA == capacityA && !finishedA){
            finishedA = true;
            critical = true;
        }
        if(elapsedB == capacityB && !finishedB){
            finishedB = true;
            critical = true;
        }
    }
}

function flip(){
    if(critical){
        //Play hourglass flip animation then swap top and bottom volumes
        if(event.target.id == "flipA"){
                elapsedA = capacityA-elapsedA;

                finishedA = false;
                critical = false;
        }
        if(event.target.id == "flipB"){
            elapsedB = capacityB-elapsedB;

            finishedB = false;
            critical = false;
        }
        if(event.target.id == "flipBoth"){
            elapsedA = capacityA-elapsedA;
            elapsedB = capacityB-elapsedB;

            finishedA = false;
            finishedB = false;
            critical = false;
        }
        drawFrame();
    }
}

drawFrame();
flipA.addEventListener("click", flip);
flipB.addEventListener("click", flip);
flipBoth.addEventListener("click", flip);
setInterval(logicLoop, 500);

