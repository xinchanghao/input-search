const shell = require("shelljs");

const isPacked = shell.test("-e", "./dist/");
if (!isPacked) {
  shell.exec("npm run build");
}

shell.cd("example");

const isInstall = shell.test("-e", "./node_modules/");

const command = process.argv.slice(2)[0];

console.log(command);

if (!isInstall) {
  shell.exec("npm install");
}

try {
  command ? shell.exec(`npm run ${command}`) : shell.exec("npm run storybook");
} catch (e) {
  console.error(e);
}
