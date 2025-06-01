// Variables and Constants
var items = ["LEFT", "RIGHT"];
var item, x;
var xs = [100, 650];
var trials = 5;
var trialnum = 0;
var correctcount = 0;
var start_exp = 0;
var accept_click = 0;
var endTime;
var startTime;
var time = [];
const wordDict = {
  a: "LEFT",
  l: "RIGHT",
  A: "LEFT",
  L: "RIGHT"
};
// Get HTML Elements
var countElement = document.getElementById("count");
var experimentElement = document.getElementById("experiment");
var experiment1Element = document.getElementById("experiment1");
var resetButton = document.getElementById("resetButton");
// Function to get a random element from an array
function getRandom(objects) {
  return objects[Math.floor(Math.random() * objects.length)];
}

// Function to clear the canvas
function clearCanvas() {
  window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
}
// Function to write text on the canvas
function writeText(text, color = "white") {
  clearCanvas();
  window.ctx.fillStyle = color;
  window.ctx.textAlign = "center";
  window.ctx.font = "2em sans-serif";
  window.ctx.fillText(
    text,
    window.canvas.width / 2,
    window.canvas.height / 2
  );
}

// Function to end the experiment
function endExperiment1() {
  clearCanvas();
  writeText("Thank you!");
  window.canvas = experiment1Element;
  window.ctx = window.canvas.getContext("2d");
  window.ctx.textAlign = "center";
  window.ctx.font = "2rem sans-serif";
  let times = time.toString();
  experiment1Element.innerHTML = times;
  window.ctx.textAlign = "center";
  window.ctx.fillStyle = "black";
  window.ctx.fillText(times, window.canvas.width / 2, window.canvas.height / 2);
  resetButton.disabled = false; // Enable reset button
}
// Function to display a trial
function displayTrial() {
  if (trialnum < trials) {
    startTime = Date.now();
    clearCanvas();
    item = getRandom(items);
    x = getRandom(xs);
    window.ctx.fillStyle = "yellow";
    window.ctx.font = "2rem Arial";
    window.ctx.fillText(item, x, window.canvas.height / 2);
    accept_click = 1;
  } else {
    endExperiment1();
  }
}

// Event listener for keydown events
document.addEventListener("keydown", function (f) {
  if (f.key == " " && trialnum == 0 && start_exp == 0) {
    start_exp = 1;
    setTimeout(displayTrial, 500);
    return;
  }
  if (f.key == "r") {
    location.reload();
    correctcount = 0;
    start_exp = 0;
    trialnum = 0;
    clearCanvas();
    return;
  }
  if (start_exp == 1 && accept_click == 1 && trialnum < trials) {
    accept_click = 0;
    endTime = Date.now();
    var timetaken = endTime - startTime;
    time.push(timetaken);
    console.log(timetaken);
    console.log(time);
    for (let key in wordDict) {
      if (f.key == key && item == wordDict[key]) {
        writeText("Correct", color = "#00FF00");
        correctcount++;
        trialnum++;
        countElement.innerHTML = correctcount;
        setTimeout(displayTrial, 2000);
        return;
      }
    }
    setTimeout(displayTrial, 2000);
    trialnum++;
    if (f.key != "a" && f.key != "l" && f.key != "L" && f.key != "A") {
      trialnum--;
      writeText("Wrong Key press", color = "#FF0000");
      console.log("not accepted");
      return;
    }
    writeText("Wrong", color = "#FF0000");
  }
});
// Function to display instructions
function instructions() {
  writeText("Press space to start the experiment");
}

// Function to reset the experiment
function resetExperiment() {
  correctcount = 0;
  start_exp = 0;
  trialnum = 0;
  clearCanvas();
  setup();
  time = [];
  countElement.innerHTML = correctcount;
  instructions();
  resetButton.disabled = true; // Disable reset button
}
// Event listener for reset button click
resetButton.addEventListener("click", resetExperiment);
// Function to set up the experiment
function setup() {
  window.canvas = experimentElement;
  window.ctx = window.canvas.getContext("2d");
  window.ctx.textAlign = "center";
  window.ctx.font = "2rem sans-serif";
  correctcount = 0;
  resetButton.disabled = true; // Disable reset button
}
// Main function
function main() {
  setup();
  instructions();
}
// Call the main function
main();
