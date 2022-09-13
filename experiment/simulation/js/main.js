var items = ["LEFT", "RIGHT"];
var item,x;
var xs = [100, 700];
var trials = 2;
var trialnum = 0;
var correctcount = 0;
var start_exp=0;
var accept_click=0;
var endTime;
var startTime;
var time = [];

const wordDict = {
    a: "LEFT",
    l: "RIGHT",
};

document.getElementById("count").innerHTML = correctcount;

function getRandom(objects) {
    return objects[Math.floor(Math.random() * objects.length)];
}

function clearCanvas() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

function writeText(text, color = "white") {
    clearCanvas();
    window.ctx.fillStyle = color;
    window.ctx.fillText(
        text,
        window.canvas.width / 2,
        window.canvas.height / 2
    );
}

function endExperiment() {
    clearCanvas();
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
    let times = time.toString();
    document.getElementById("experiment").innerHTML = times;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(times, 400, 250);
    
}    

function displayTrial() {
    if (trialnum < trials) {
        startTime = Date.now();
        clearCanvas();
        item = getRandom(items);
        x = getRandom(xs);
        ctx.fillStyle = "yellow";
        ctx.font = "30px Arial";
        ctx.fillText(item, x, 250);
        accept_click=1;
    } 
    else {
        endExperiment();
    }
}

document.addEventListener("keydown", function (f) {
    if (f.key == " " && trialnum == 0) {
        start_exp=1;
        displayTrial();
        return;
    }

    if (f.key == "r") {
        correctcount=0;
        start_exp=0;
        trialnum=0;
        document.getElementById("count").innerHTML = correctcount;
        main();
        return;
    }
    
    if(start_exp==1 &&accept_click==1 && trialnum<trials){
        accept_click=0;
        endTime = Date.now();
        var timetaken = endTime - startTime;
        time.push(timetaken);
        console.log(timetaken);
        console.log(time);
        for (let key in wordDict) {
            if (f.key == key && item == wordDict[key] ) {
                writeText("Correct", color = "#00FF00");
                correctcount++;
                trialnum++;
                document.getElementById("count").innerHTML = correctcount;
                setTimeout(displayTrial, 2000);
                return;
            }
        }
        
        setTimeout(displayTrial, 2000);
        trialnum++;
        writeText("Wrong", color = "#FF0000");
    }
});

function setup() {
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
    correctcount = 0;
}

function instructions() {
    var c = document.getElementById("experiment");
    var ctx = c.getContext("2d");
    var img = document.getElementById("pic");
    ctx.drawImage(img, 0, 0, 800, 500);
}
    
function main() {
    setup();
    instructions();
}
