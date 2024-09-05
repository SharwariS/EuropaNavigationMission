// import Plateau from './Plateau.js';

// class InputParser {
//   static parse(input) {
//     const lines = input.trim().split('\n');
    
//     // Validate plateau dimensions
//     if (lines.length < 1) {
//       throw new Error("Input must include plateau dimensions.");
//     }
    
//     const [width, height] = lines[0].split(' ').map(Number);

//     if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
//       throw new Error("Plateau dimensions must be positive integers.");
//     }

//     const plateau = new Plateau(width, height);
    
//     const robotsData = [];
    
//     for (let i = 1; i < lines.length; i += 2) {
//       if (i + 1 >= lines.length) {
//         throw new Error("Each robot must have both a position and a command sequence.");
//       }

//       const [x, y, direction] = lines[i].split(' ');

//       if (isNaN(parseInt(x)) || isNaN(parseInt(y)) || !['N', 'E', 'S', 'W'].includes(direction)) {
//         throw new Error("Invalid robot position or direction. Ensure format is 'x y D' where D is one of N, E, S, W.");
//       }

//       const instructions = lines[i + 1];

//       if (!/^[LRM]+$/.test(instructions)) {
//         throw new Error("Robot instructions must only contain the letters 'L', 'R', 'M'.");
//       }

//       robotsData.push({
//         x: parseInt(x),
//         y: parseInt(y),
//         direction,
//         instructions,
//       });
//     }

//     return { plateau, robotsData };
//   }
// }

// export default InputParser;

// import Plateau from './Plateau.js';

// class InputParser {
//   static parse(jsonInput) {
//     // Validate plateau dimensions
//     const plateauData = jsonInput.plateau;
//     if (!plateauData || isNaN(plateauData.width) || isNaN(plateauData.height) || plateauData.width <= 0 || plateauData.height <= 0) {
//       throw new Error("Plateau dimensions must be positive integers.");
//     }
    
//     const plateau = new Plateau(plateauData.width, plateauData.height);

//     const robotsData = jsonInput.robots;

//     if (!Array.isArray(robotsData) || robotsData.length === 0) {
//       throw new Error("At least one robot must be provided.");
//     }

//     const parsedRobots = [];

//     // Validate each robot's data
//     robotsData.forEach((robot, index) => {
//       const { position, commands } = robot;

//       if (!position || isNaN(position.x) || isNaN(position.y) || !['N', 'E', 'S', 'W'].includes(position.direction)) {
//         throw new Error(`Invalid robot position or direction at index ${index}. Ensure format is {x: number, y: number, direction: 'N'|'E'|'S'|'W'}.`);
//       }

//       if (!/^[LRM]+$/.test(commands)) {
//         throw new Error(`Invalid robot commands at index ${index}. Commands must only contain 'L', 'R', 'M'.`);
//       }

//       parsedRobots.push({
//         x: parseInt(position.x),
//         y: parseInt(position.y),
//         direction: position.direction,
//         instructions: commands,
//       });
//     });

//     return { plateau, robotsData: parsedRobots };
//   }
// }

// export default InputParser;

import Plateau from './Plateau.js';

class InputParser {
  static parse(jsonInput) {
    // Validate plateau dimensions
    const plateauData = jsonInput.plateau;
    if (!plateauData || isNaN(plateauData.width) || isNaN(plateauData.height) || plateauData.width <= 0 || plateauData.height <= 0) {
      throw new Error("Plateau dimensions must be positive integers.");
    }
    
    const plateau = new Plateau(plateauData.width, plateauData.height);

    // Validate robots data
    const robotsData = jsonInput.robotsData; // Updated to match the correct key in JSON

    if (!Array.isArray(robotsData) || robotsData.length === 0) {
      throw new Error("At least one robot must be provided.");
    }

    const parsedRobots = [];

    // Validate each robot's data
    robotsData.forEach((robot, index) => {
      const { x, y, direction, instructions } = robot;

      if (typeof x !== 'number' || typeof y !== 'number' || !['N', 'E', 'S', 'W'].includes(direction)) {
        throw new Error(`Invalid robot position or direction at index ${index}. Ensure format is {x: number, y: number, direction: 'N'|'E'|'S'|'W'}.`);
      }

      if (!/^[LRM]+$/.test(instructions)) {
        throw new Error(`Invalid robot instructions at index ${index}. Instructions must only contain 'L', 'R', 'M'.`);
      }

      parsedRobots.push({
        x: parseInt(x),
        y: parseInt(y),
        direction: direction,
        instructions: instructions,
      });
    });

    return { plateau, robotsData: parsedRobots };
  }
}

export default InputParser;
