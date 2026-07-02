const hourglass = document.getElementById("hourglass");
const sands = hourglass.getContext("2d");
hourglass.height = 1000;
hourglass.width = 2000;

const stopwatch = document.getElementById("stopwatch")
const time = stopwatch.getContext("2d");
stopwatch.width = 500;
stopwatch.height = 500;

time.font = "100px rockwell";
time.textAlign = "center";
time.textBaseline = "middle";

const flipA = document.getElementById("flipA");
const flipBoth = document.getElementById("flipBoth")
const flipB = document.getElementById("flipB");
const remain = document.getElementById("remain")

let finishedA = true;
let finishedB = true;
let critical = true;
let animate = 0;
let frame = 0;
let frameD

var t = 0;
var capacityA = 4;
var capacityB = 137;
var elapsedA = capacityA;
var elapsedB = capacityB;

function drawHourglass(originX, originY, width, height, theta, max, elapsed){
    let topA = Math.sqrt((max-elapsed)/max);
    let bottomA = Math.sqrt(elapsed/max);

    //Rotation
    sands.translate(originX, originY);
    sands.rotate(theta*Math.PI/180);
    sands.translate(-originX, -originY);

    //Top Fill
    sands.beginPath();
    sands.moveTo(originX-topA*(width/2), originY-topA*(height/2));
    sands.lineTo(originX+topA*(width/2), originY-topA*(height/2));
    sands.lineTo(originX, originY);
    sands.closePath();
    sands.fill();

    //Bottom Fill
    //Geometrically congruent to the unfilled section from the top
    sands.beginPath();
    sands.moveTo(originX-topA*(width/2), originY+topA*(height/2));
    sands.lineTo(originX+topA*(width/2), originY+topA*(height/2));
    sands.lineTo(originX+width/2, originY+height/2);
    sands.lineTo(originX-width/2, originY+height/2);
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

    sands.fillText("Remaining: "+(capacityA-elapsedA), 100, 300);
    sands.fillText("Elapsed: "+(elapsedA), 100, 700);
    sands.fillText("Remaining: "+(capacityB-elapsedB), 1600, 300);
    sands.fillText("Elapsed: "+(elapsedB), 1600, 700);


    time.clearRect(0, 0, 1000, 1000);
    //Draw stopwatch dial
    time.translate(250, 250);
    time.rotate(Math.PI/4);
    time.fillStyle = "gainsboro";
    time.beginPath();
    time.fillRect(-15, -250, 30, 100);
    time.closePath()
    time.fillStyle = "silver";
    time.beginPath();
    time.fillRect(-60, -260, 120, 30);
    time.closePath();
    time.setTransform(1, 0, 0, 1, 0, 0);

    //Draw stopwatch body
    time.beginPath();
    time.fillStyle = "darkgrey";
    time.arc(250, 250, 190, 0, 6.28);
    time.closePath();
    time.fill();
    time.beginPath();
    time.fillStyle = "grey";
    time.arc(250, 250, 170, 0, 6.28);
    time.closePath();
    time.fill();
    time.fillStyle = "darkseagreen";
    time.fillRect(125, 200, 250, 100);
    time.fillStyle = "red";
    time.fillText(t, 250, 275);
}

function logicLoop(){
    //Check if at a critical point where user input is needed
    if(critical){
        //Do not let time pass until the user makes their decision
        return;
    }
    else if(animate != 0){
        //Do not let time pass while animating
        //After animation is done, apply swap of top and bottom 
        if(animate == "a"){
            frame += 20;
            drawFrame(-frame);
            if(frame >= 180){
                elapsedA = capacityA-elapsedA;
                animate = "wait";
            }
        }
        if(animate == "b"){
            frame += 20;
            drawFrame(0, frame);
            if(frame >= 180){
                elapsedB = capacityB-elapsedB;
                animate = "wait";
            }
        }
        if(animate == "ab"){
            frame += 20;
            drawFrame(-frame, frame);
            if(frame >= 180){
                elapsedA = capacityA-elapsedA;
                elapsedB = capacityB-elapsedB;
                animate = "wait";
            }
        }
        if(animate == "wait"){
            frame += 10;
            if(frame >= 60){
                animate = 0;
            }
        }
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
                finishedA = false;
                critical = false;
                animate = "a"
                frame = 0;
        }
        if(event.target.id == "flipB"){
            finishedB = false;
            critical = false;
            animate = "b"
            frame = 0;
        }
        if(event.target.id == "flipBoth"){
            finishedA = false;
            finishedB = false;
            critical = false;
            animate = "ab"
            frame = 0;
        }
        if(event.target.id == "remain"){
            if(!(finishedA && finishedB)){
                console.log("yoy");
                critical = false;
            }
        }
        drawFrame();
    }
}

drawFrame();
flipA.addEventListener("click", flip);
flipB.addEventListener("click", flip);
flipBoth.addEventListener("click", flip);
remain.addEventListener("click", flip);
setInterval(logicLoop, 500);