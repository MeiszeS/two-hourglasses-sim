const hourglass = document.getElementById("hourglass");
const sands = hourglass.getContext("2d");

hourglass.height = 1000;
hourglass.width = 2000;

var capacityA = 4;
var capacityB = 7;
var elapsedA = 0;
var elapsedB = 0;

function drawHourglass(originX, originY, width, height, theta, max, elapsed){
    sands.translate(originX, originY);
    sands.rotate(theta);
    sands.translate(-originX, -originY);

    console.log(elapsed/max);

    //Top Fill
    sands.beginPath();
    sands.moveTo(originX-(elapsed/max)*(width/2), originY-(elapsed/max)*(height/2));
    sands.lineTo(originX+(elapsed/max)*(width/2), originY-(elapsed/max)*(height/2));
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

    sands.beginPath()
    sands.moveTo(originX-width/2, originY+height/2);
    sands.lineTo(originX+width/2, originY+height/2);
    sands.lineTo(originX, originY);
    sands.closePath()
    sands.stroke()

    sands.setTransform(1, 0, 0, 1, 0, 0);
}

var t = 0;
function drawFrame(){
    sands.lineWidth = 10;
    sands.fillStyle = "green";
    sands.clearRect(0, 0, 2000, 1000);
    drawHourglass(600, 500, 300, 700, 0, 100, 101);
    //drawHourglass(1400, 500, 300, 700, t/110);
    t++;
}

setInterval(drawFrame, 25);

