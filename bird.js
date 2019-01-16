function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  }
  return x;
}

class Bird {
  constructor(brain) {
    this.x = 64; // Bird width
    this.y = height / 2; // Bird height
    this.r = 12; // Bird radius since it's a circle
    this.gravity = 0.8;
    this.lift = -12; // Jump (up) distance
    this.velocity = 0; // How fast the bird moves

    // A bird is a NN, basically
    if (brain instanceof NeuralNetwork) { // If copy
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.score = 0; // Num frames survived by the bird
    this.fitness = 0; // Fitness = normalized score
  }

  // Copy bird for next gen
  copy() {
    return new Bird(this.brain);
  }

  // Display the bird
  render() {
    stroke('#533846');
    fill('#F9F025');
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  // Should the bird jump?
  think(pipes) {
    // First find the closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = [];
      // x position of closest pipe
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      // top of closest pipe opening
      inputs[1] = map(closest.top, 0, height, 0, 1);
      // bottom of closest pipe opening
      inputs[2] = map(closest.bottom, 0, height, 0, 1);
      // bird's y position
      inputs[3] = map(this.y, 0, height, 0, 1);
      // bird's y velocity
      inputs[4] = map(this.velocity, -5, 5, 0, 1);

      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.velocity += this.lift;
      }
    }
  }

  bottomTop() {
    return (this.y > height || this.y < 0); // Bird dies when out of bounds
  }

  // Update bird's position on canvas
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.score++; // Increase bird's score because it's alive for another frame
  }
}
