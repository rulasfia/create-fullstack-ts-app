#!/usr/bin/env node

const script = require('./scripts.js')
const runCommand = require('./runner.js').runCommand;
const cleanUpOnFail = require('./cleanup.js').cleanUpOnFail;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initialize the project
function initializeProject(dir) {
  console.log(`Initializing fullstack typescript monorepo in ${dir}`);
  const checkedOut = runCommand(script.gitCloneCommand(dir));
  if (!checkedOut) {
    cleanUpOnFail(dir)
  }

  console.log("Installing dependencies...");
  const depsInstalled = runCommand(script.installDepsCommand(dir));
  if (!depsInstalled) {
    cleanUpOnFail(dir)
  }

  console.log("Cleaning up...");
  const cleanedUp = runCommand(script.cleanupCommand(dir));
  if (!cleanedUp) {
    cleanUpOnFail(dir)
  }

  console.log("Initializing git...");
  const gitInitialized = runCommand(script.initGitCommand(dir));
  if (!gitInitialized) {
    cleanUpOnFail(dir)
  }

  console.log("Running post-install script...");
  const postInstallScriptFinished = runCommand(script.postInstallCommnad(dir))
  if (!postInstallScriptFinished) {
    cleanUpOnFail(dir)
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
