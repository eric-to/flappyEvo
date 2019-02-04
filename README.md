## Flappy Evo
Simulating playing Flappy Bird with AI learning via the genetic algorithm
![game](./game.gif)

## Technologies
* JavaScript
* HTML/CSS

## Overview
Flappy Bird is a simple game, but that doesn't mean it's easy to obtain a high score. This simulator teaches AI how to play Flappy Bird (and well). A neural network + genetic algorithm was used to create this simulator. The broad overview of how this is done: the neural network takes in multiple inputs. In this case, 3 inputs: the bird's Y-position, the bird's distance from the next set of pipes, and how fast the bird is going. Whether the bird jumps or not is the single output. The neural network acts like a brain and decides when to jump based on its environment and gets better through trial-and-error. The real MVP of this simulator, though, is the genetic algorithm. The genetic algorithm functions like selectivity in Darwinism. Only the strongest survive. Using the algorithm, many birds (each having a brain, which is the neural network) form one generation. All the birds start the game simultaneously and a new generation is born each time one generation completely dies out, or lose the game rather. Every subsequent generation is smarter than the previous generation. The best/longest-surviving bird is used to breed/create the next generation and some genetic mutation (change the neural net biases technically) happens to ensure that future generations continue to learn (rather than be complacent and assume that they're a perfect AI).

## Genetic Algorithm
Here is a rather simplistic overview of how the genetic algorithm works. Like in the theory of evolution, the fittest survive and those genes belonging to them are passed down to future generations to ensure survival of their kind. What happens here is similar. When the 'oldBirds' all lose the game, they're passed to the 'generate' function, which creates a new set of birds based on the older ones. The ones with higher scores or took longer to lose the game are preferred. Higher fitness value (determined by game score) = better bird essentially.
```javascript
function nextGeneration() {
  resetGame();
  normalizeFitness(allBirds);
  activeBirds = generate(allBirds);
  allBirds = activeBirds.slice();
}

function generate(oldBirds) {
  let newBirds = [];
  for (let i = 0; i < oldBirds.length; i++) {
    let bird = selectFromPool(oldBirds);
    newBirds.push(bird);
  }
  return newBirds;
}
```
