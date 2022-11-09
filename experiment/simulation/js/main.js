var items = ["LEFT", "RIGHT"];
var item,x;
var xs = [100, 984];
var trials = 5;
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
    writeText("Thankyou!");
}    

function endExperiment1() {
    clearCanvas();
    writeText("Thankyou!");
    window.canvas = document.getElementById("experiment1");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
    let times = time.toString();
    document.getElementById("experiment1").innerHTML = times;
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(times, window.canvas.width/2, window.canvas.height/2);
}    

function displayTrial() {
    if (trialnum < trials) {
        startTime = Date.now();
        clearCanvas();
        item = getRandom(items);
        x = getRandom(xs);
        ctx.fillStyle = "yellow";
        ctx.font = "50px Arial";
        ctx.fillText(item, x, 316);
        accept_click=1;
    } 
    else {
        endExperiment();
    }
}

document.addEventListener("keydown", function (f) {
    if (f.key == " " && trialnum == 0 &&  start_exp==0) {
        start_exp=1;
        setTimeout(displayTrial,2000);
        return;
    }

    if (f.key == "r") {
        location.reload();
        correctcount=0;
        start_exp=0;
        trialnum=0;
        clearCanvas();   
        return;
    }
    
    if(start_exp==1 && accept_click==1 && trialnum<trials){
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
        if(f.key !="a" && f.key !="l"){
            trialnum--;
            writeText("Wrong Key press", color = "#FF0000");
            console.log("not accepted")
            return;
        }
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
    writeText("Press space to start the experiment");
}
    
function main() {
    setup();
    instructions();
}
