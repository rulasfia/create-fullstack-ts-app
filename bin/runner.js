const { execSync } = require("child_process");

// Run the command
function runCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`);
    return false;
  }

  return true;
}

module.exports = { runCommand }