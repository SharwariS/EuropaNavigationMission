// src/Plateau.js
class Plateau {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    //   this.obstacles = new Set(); // For future extensions
    }
  
    isWithinBounds(x, y) {
      return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
  
    // addObstacle(x, y) {
    //   this.obstacles.add(`${x},${y}`);
    // }
  
    // isObstacle(x, y) {
    //   return this.obstacles.has(`${x},${y}`);
    // }
  }
  
  export default Plateau;
  