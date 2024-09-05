import Robot from './Robot.js';

class CommandProcessor {
  constructor(robot) {
    this.robot = robot;
  }

  process(commands) {
    for (let command of commands) {
      try {
        this.robot.executeInstruction(command);
      } catch (error) {
        console.error(`Failed to execute command '${command}' for robot at position ${this.robot.getPosition()}: ${error.message}`);
      }
    }
  }
}

export default CommandProcessor;
