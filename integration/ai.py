const { PythonShell } = require('python-shell');

async function runAIPrediction(data) {
  return new Promise((resolve, reject) => {
    PythonShell.run('ai.py', { args: [JSON.stringify(data)] }, (err, results) => {
      if (err) reject(err);
      resolve(JSON.parse(results[0]));
    });
  });
}

module.exports = { runAIPrediction };
