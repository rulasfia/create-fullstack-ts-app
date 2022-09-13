#!/usr/bin/env node

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

const repoName = process.argv[2];

if (!repoName) {
  console.error("Please provide a directory name");
  process.exit(1);
}

// clone the repo
const gitCheckoutCommand = `git clone --depth 1 https://github.com/jsjoeio/create-express-ts ${repoName}`;
// install dependencies
const installDepsCommand = `cd ${repoName} && yarn install`;
// remove bin file & git history
const cleanupCommand = `cd ${repoName} && rm -rf ./bin && rm -rf .git`;
// initialize git
const initGitCommand = `cd ${repoName} && git init`;

console.log(`Initializing fullstack typescript monorepo in ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) {
  process.exit(1);
}

console.log("Installing dependencies...");
const depsInstalled = runCommand(installDepsCommand);
if (!depsInstalled) {
  process.exit(1);
}

console.log("Cleaning up...");
const cleanedUp = runCommand(cleanupCommand);
if (!cleanedUp) {
  process.exit(1);
}

console.log("Initializing git...");
const gitInitialized = runCommand(initGitCommand);
if (!gitInitialized) {
  process.exit(1);
}

console.log(`\n🎉 Your project is ready!`);
console.log(`➡️ 'cd ${repoName}' to get started`);
