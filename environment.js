class Pipe {
  constructor() {
    const GAP = 125; // Gap between pipes in pixels 
    const CENTER = random(GAP, height - GAP); // Center coords of gap

    this.top = CENTER - GAP / 2; // Pipe top
    this.bottom = height - (CENTER + GAP / 2); // Pipe bottom
    this.x = width; // Set x to be the pipe's edge
    this.w = 75; // Pipe width
    this.speed = 6; // How fast pipe scrolls by
  }

  // Checks if a bird has hit the pipe
  hits(bird) {
    if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  render() {
    stroke('#533846');
    fill('#73BE2E');
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  // Move/update the pipe
  update() {
    this.x -= this.speed;
  }

  // Check if pipe is off the screen
  offscreen() {
    return this.x < (-this.w)
  }
}
