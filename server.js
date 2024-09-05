import express from 'express';
import Robot from './src/Robot.js';
import Plateau from './src/Plateau.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the mission JSON file
const missionFilePath = path.join(__dirname, 'data/mission.json');
const ResultFilePath = path.join(__dirname, 'data/results.json');

// GET /api/mission/:id
app.get('/api/mission/:id', (req, res) => {
    const missionId = parseInt(req.params.id, 10); // Get missionId from request

    // Read the results from the results.json file
    fs.readFile(ResultFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the result file:', err);
            return res.status(500).json({ error: 'Error reading the result file.' });
        }

        try {
            const results = JSON.parse(data);
            const missionResults = results.filter(result => result.missionId === missionId);

            if (missionResults.length === 0) {
                return res.status(404).json({ error: 'Mission results not found.' });
            }

            res.json({ missionId, results: missionResults });
        } catch (parseErr) {
            console.error('Error parsing the result file:', parseErr);
            res.status(500).json({ error: 'Error parsing the result file.' });
        }
    });
});


// POST /api/mission
app.post('/api/mission', (req, res) => {
    fs.readFile(missionFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the mission file:', err);
            return res.status(500).json({ error: 'Error reading the mission file.' });
        }

        let missions;
        try {
            missions = JSON.parse(data);
            console.log('Missions : ', missions);
            if (!Array.isArray(missions)) {
                throw new Error('Parsed data is not in the expected format.');
            }

            // Process each mission
                const results = [];

                missions.forEach((mission, index) => {
                    // Ensure that the mission has plateau and robotsData
                    if (!mission.plateau || typeof mission.plateau.width === 'undefined' || typeof mission.plateau.height === 'undefined') {
                        console.error(`Mission is missing plateau dimensions.`);
                        return;
                    }

                    if (!Array.isArray(mission.robotsData)) {
                        console.error(`Mission ${index} is missing robots data.`);
                        return;
                    }
                    const missionId = index + 1;
                    const plateau = new Plateau(mission.plateau.width, mission.plateau.height);

                    const missionResults = {
                        missionId,
                        results: []
                    };

                    mission.robotsData.forEach(robotData => {
                        if (typeof robotData.x === 'undefined' || typeof robotData.y === 'undefined' || !robotData.direction || !robotData.instructions) {
                            console.error(`Robot data ${robotIndex} in mission ${index} is invalid.`);
                            return;
                        }
                        console.log('Processing robot data:', robotData);
                        const robot = new Robot(robotData.x, robotData.y, robotData.direction, plateau);
                            
                        robotData.instructions.split('').forEach(instruction => {
                            robot.executeInstruction(instruction);
                        });

                        missionResults.results.push({
                            initialPosition: `${robotData.x} ${robotData.y} ${robotData.direction}`,
                            finalPosition: robot.getPosition()
                        });
                    });

                    results.push(missionResults);
                });

            fs.writeFile(ResultFilePath, JSON.stringify(results, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing the result file:', writeErr);
                    return res.status(500).json({ error: 'Error saving the result file.' });
                }

                res.status(201).json({ message: 'Mission(s) added successfully!', missionId: missions.length - 1 });
            });

        } catch (parseErr) {
            console.error('Error parsing mission file:', parseErr);
            res.status(500).json({ error: 'Error parsing the mission file.' });
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

