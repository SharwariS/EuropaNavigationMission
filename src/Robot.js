class Robot {
    constructor(x, y, direction, plateau) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.plateau = plateau;
      this.directions = ['N', 'E', 'S', 'W'];
    }
  
    executeInstruction(instruction) {
      switch (instruction) {
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        case 'M':
          this.advance();
          break;
        default:
          throw new Error(`Invalid instruction '${instruction}'`);
      }
    }
  
    turnLeft() {
      const idx = this.directions.indexOf(this.direction);
      this.direction = this.directions[(idx + 3) % 4];
    }
  
    turnRight() {
      const idx = this.directions.indexOf(this.direction);
      this.direction = this.directions[(idx + 1) % 4];
    }
  
    advance() {
      let newX = this.x;
      let newY = this.y;
      
      switch (this.direction) {
        case 'N':
          newY += 1;
          break;
        case 'E':
          newX += 1;
          break;
        case 'S':
          newY -= 1;
          break;
        case 'W':
          newX -= 1;
          break;
      }
  
      if (this.plateau.isWithinBounds(newX, newY)) {
        // if (this.plateau.isObstacle(newX, newY)) {
        //   console.warn(`Robot at position ${this.getPosition()} cannot move forward due to an obstacle.`);
        // } else {
          this.x = newX;
          this.y = newY;
        // }
      } else {
        console.warn(`Robot at position ${this.getPosition()} cannot move forward out of plateau bounds.`);
      }
    }
  
    getPosition() {
      return `${this.x} ${this.y} ${this.direction}`;
    }
  }
  
  export default Robot;
  