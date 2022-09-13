const runCommand = require('./runner.js').runCommand;

function cleanUpOnFail(dir) {
  console.log('Rolling back...');
  runCommand(`npx shx rm -rf ${dir}`);
 
  console.log("Aborting...");
  process.exit(1)
}

module.exports = { cleanUpOnFail }