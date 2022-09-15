const templateRepo = "https://github.com/rulasfia/create-fullstack-ts-app";

/**
 * user os type
 * @typedef {'win32' | 'linux' | 'darwin' | 'android' | ''} OsType
 */

/**
 * clone the repo
 * @param {string} dir - directory to clone the repo
 */
const gitCloneCommand = (dir) => `git clone --depth 1 ${templateRepo} ${dir}`;

/**
 * install dependencies
 * @param {string} dir - project directory
 */
const installDepsCommand = (dir) => `cd ${dir} && npm install`;

/**
 * remove bin file & git history
 * @param {string} dir - project directory
 */
const cleanupCommand = (dir) =>
  `cd ${dir} && npx shx rm -rf ./bin && npx shx rm -rf .git`;

/**
 * initialize git
 * @param {string} dir - project directory
 */
const initGitCommand = (dir) => `cd ${dir} && git init`;

/**
 * apply prisma migration
 * @param {string} dir - project directory
 */
const postInstallCommnad = (dir) =>
  `cd ${dir}/apps/server && npx prisma migrate dev --name init && npx prisma generate`;

module.exports = {
  gitCloneCommand,
  installDepsCommand,
  cleanupCommand,
  initGitCommand,
  postInstallCommnad,
};
