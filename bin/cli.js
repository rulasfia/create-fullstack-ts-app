#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const templateRepo = "https://github.com/rulasfia/create-fullstack-ts-app";

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

// clone the repo
const gitCloneCommand = (dir) => `git clone --depth 1 ${templateRepo} ${dir}`;
// install dependencies
const installDepsCommand = (dir) => `cd ${dir} && npm install`;
// remove bin file & git history
const cleanupCommand = (dir) => `cd ${dir} && rm -rf ./bin && rm -rf .git`;
// initialize git
const initGitCommand = (dir) => `cd ${dir} && git init`;

// Initialize the project
function initializeProject(dir) {
  console.log(`Initializing fullstack typescript monorepo in ${dir}`);
  const checkedOut = runCommand(gitCloneCommand(dir));
  if (!checkedOut) {
    process.exit(1);
  }

  console.log("Installing dependencies...");
  const depsInstalled = runCommand(installDepsCommand(dir));
  if (!depsInstalled) {
    process.exit(1);
  }

  console.log("Cleaning up...");
  const cleanedUp = runCommand(cleanupCommand(dir));
  if (!cleanedUp) {
    process.exit(1);
  }

  console.log("Initializing git...");
  const gitInitialized = runCommand(initGitCommand(dir));
  if (!gitInitialized) {
    process.exit(1);
  }

  console.log(`\n🎉 Your project is ready!`);
  console.log(`➡️ 'cd ${dir}' to get started`);

  return;
}

/** ============================================================= */
const repoName = process.argv[2];

if (!repoName) {
  console.error("Please provide a directory name");
  process.exit(1);
}

console.log(`This will initialize the project in ${repoName} directory.`);

readline.question(`\n Are you sure you want to continue? (y/n) `, (answer) => {
  if (answer === "y") {
    initializeProject(repoName);
  } else {
    console.log("Aborting...");
    process.exit(1);
  }

  readline.close();
});
