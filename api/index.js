const express = require('express');
const rateLimit = require('express-rate-limit');
const { PythonShell } = require('python-shell');
require('dotenv').config();
const config = require('../config/app');
const { startP2PNode } = require('../integration/p2p');
const Agent = require('../models/Agent');

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: config.rateLimit,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

const agents = {};

app.post('/agent/assess', (req, res) => {
  try {
    const { agentId, data } = req.body;
    if (!agentId || !data) {
      return res.status(400).json({ error: 'Agent ID and post-op data required' });
    }
    if (!agents[agentId]) {
      agents[agentId] = new Agent(agentId, 'medical');
    }
    agents[agentId].assignTask(`Assess post-op data: ${data}`);
    res.json({ status: 'Assessment task assigned to agent' });
  } catch (error) {
    res.status(500).json({ error: 'Assessment failed' });
  }
});

app.post('/research/verify', async (req, res) => {
  try {
    const { computation, data } = req.body;
    if (!computation || !data) {
      return res.status(400).json({ error: 'Computation and biomed data required' });
    }
    const options = {
      mode: 'text',
      pythonPath: 'python3',
      pythonOptions: ['-u'],
      scriptPath: './integration',
      args: [data]
    };
    PythonShell.run('ai.py', options, (err, results) => {
      if (err) {
        console.error('Verification error:', err);
        return res.status(500).json({ error: 'Verification failed' });
      }
      res.json({ receipt: `Reproducibility receipt: ${results[0]}` });
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

startP2PNode().catch(console.error);

app.listen(config.port, () => console.log(`MedIntel API running on port ${config.port}`));
