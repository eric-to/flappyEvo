let totalPopulation = 500; // population size
let activeBirds = []; // surviving/ongoing birds
let allBirds = []; // all of one generation's birds
let pipes = []; // pipes on screen
let counter = 0; // used to determine frames and when to place pipes

// Dom elements used as interface
let speedSlider;
let speed;
let score;
let bestScore;
let genCount = 2;
let highScore = 0; // Best high score ever

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');

  // Access the interface elements
  speedSlider = select('#speedSlider');
  speed = select('#speed');
  score = select('#hs');
  bestScore = select('#ahs');
  genNum = select('#gen');

  // Create a population
  for (let i = 0; i < totalPopulation; i++) {
    let bird = new Bird();
    activeBirds.push(bird);
    allBirds.push(bird);
  }
}

function draw() {
  background('#4EC0CA');
  let cycles = speedSlider.value(); // Speed up simulation if requested
  speed.html(cycles);

  // How many times to advance the game
  for (let n = 0; n < cycles; n++) {
    // Show all the pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = activeBirds.length - 1; i >= 0; i--) {
      let bird = activeBirds[i];
      // Bird uses its brain!
      bird.think(pipes);
      bird.update();

      // Check all the pipes
      for (let j = 0; j < pipes.length; j++) {
        // It's hit a pipe
        if (pipes[j].hits(activeBirds[i])) {
          // Remove this bird
          activeBirds.splice(i, 1);
          break;
        }
      }

      if (bird.bottomTop()) {
        activeBirds.splice(i, 1);
      }
    }

    // Add a new pipe every so often
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  // What is highest score of the current population
  let tempHighScore = 0;
  for (let i = 0; i < activeBirds.length; i++) {
    let s = activeBirds[i].score;
    if (s > tempHighScore) {
      tempHighScore = s;
    }
  }

  // Is it the all time high scorer?
  if (tempHighScore > highScore) {
    highScore = tempHighScore;
  }

  // Update DOM Elements
  score.html(tempHighScore);
  bestScore.html(highScore);

  // Draw everything!
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].render();
  }

  for (let i = 0; i < activeBirds.length; i++) {
    activeBirds[i].render();
  }

  if (activeBirds.length === 0) {
    genNum.html(genCount++);
    nextGeneration(); // Ran out of birds
  }
}
