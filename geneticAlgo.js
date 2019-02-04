// Restart simulation
function resetGame() {
  counter = 0;
  pipes = [];
}

// Creates the new generation
function nextGeneration() {
  resetGame();
  normalizeFitness(allBirds); // Normalize fitness values beforehand
  activeBirds = generate(allBirds); // Get new gen birds
  allBirds = activeBirds.slice();
}

function generate(oldBirds) {
  let newBirds = [];
  for (let i = 0; i < oldBirds.length; i++) {
    let bird = selectFromPool(oldBirds); // Choose bird based on fitness
    newBirds.push(bird);
  }
  return newBirds;
}

// This makes it so that all of the birds' fitness values sum up to 1
function normalizeFitness(birds) {
  let totalScore = 0;
  for (let i = 0; i < birds.length; i++) {
    birds[i].score **= 2;
    totalScore += birds[i].score;
  }

  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / totalScore;
  }
}

// Selects one bird from old birds based on its "fitness"
function selectFromPool(birds) {
  let idx = 0;
  let r = Math.random();
  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= birds[idx].fitness;
    // And move on to the next
    idx += 1;
  }
  idx -= 1;

  // Copy, includes mutation of old bird
  return birds[idx].copy();
}
