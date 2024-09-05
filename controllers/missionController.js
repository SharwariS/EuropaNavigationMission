// const missionModel = require('../models/missionModel');

// // GET /api/mission/:id
// async function getMissionById(req, res) {
//   const missionId = req.params.id;

//   try {
//     const data = await missionModel.getMissions();
//     const mission = data.missions.find(m => m.id === missionId);

//     if (!mission) {
//       return res.status(404).json({ error: 'Mission not found' });
//     }

//     res.json(mission);
//   } catch (error) {
//     console.error('Error fetching mission:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// // POST /api/mission/:id/result
// async function postMissionResult(req, res) {
//   const missionId = req.params.id;
//   const { results } = req.body;

//   try {
//     const data = await missionModel.getMissions();
//     const missionIndex = data.missions.findIndex(m => m.id === missionId);

//     if (missionIndex === -1) {
//       return res.status(404).json({ error: 'Mission not found' });
//     }

//     // Update mission results
//     data.missions[missionIndex].results = results;

//     // Save updated missions data
//     await missionModel.saveMissions(data);

//     res.status(200).json({ message: 'Mission result saved successfully' });
//   } catch (error) {
//     console.error('Error saving mission result:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// module.exports = {
//   getMissionById,
//   postMissionResult
// };
