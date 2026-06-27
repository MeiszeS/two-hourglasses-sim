const hourglass = document.getElementById("hourglass");
const sands = hourglass.getContext("2d");

hourglass.height = 1000;
hourglass.width = 2000;

let critical = false;

var capacityA = 37;
var capacityB = 56;
var elapsedA = 0;
var elapsedB = 0;

function drawHourglass(originX, originY, width, height, theta, max, elapsed){
    let topA = Math.sqrt((max-elapsed)/max);
    let bottomA = Math.sqrt(elapsed/max);

    //Rotation
    sands.translate(originX, originY);
    sands.rotate(theta);
    sands.translate(-originX, -originY);

    console.log(topA);

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

var t = 0;
function drawFrame(){
    sands.lineWidth = 10;
    sands.fillStyle = "green";
    sands.font = "50px serif";
    sands.clearRect(0, 0, 2000, 1000);

    drawHourglass(600, 500, 300, 700, 0, capacityA, t);
    drawHourglass(1400, 500, 300, 700, 0, capacityB, t);

    //Draw time interface
    sands.fillText("Remaining: "+(capacityA-t), 100, 300);
    sands.fillText("Elapsed: "+(elapsedA), 100, 700);
    sands.fillText("Remaining: "+(capacityB-t), 1600, 300);
    sands.fillText("Elapsed: "+(elapsedB), 1600, 700);
    elapsedA++;
    elapsedB++;
    t++;
}

setInterval(drawFrame, 1000);

