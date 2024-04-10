import chalk from "chalk";

async function infoMessage(message) {
  return console.log(chalk.bgMagenta.black(`[${await getCurrentTime()}] Discord >`) + " " + chalk.magenta(message));
}

async function successMessage(message) {
  return console.log(
    chalk.bgGreenBright.black(`[${await getCurrentTime()}] Minecraft >`) + " " + chalk.greenBright(message)
  );
}

async function infov2Message(message) {
  return console.log(chalk.bgCyan.black(`[${await getCurrentTime()}] Web >`) + " " + chalk.cyan(message));
}

async function warnMessage(message) {
  return console.log(chalk.bgYellow.black(`[${await getCurrentTime()}] Warning >`) + " " + chalk.yellow(message));
}

async function errorMessage(message) {
  return console.log(chalk.bgRedBright.black(`[${await getCurrentTime()}] Error >`) + " " + chalk.redBright(message));
}

async function APIMessage(message) {
  return console.log(`${chalk.bgBlue.black(`[${await getCurrentTime()}] API >`)} ${chalk.blue(message)}`);
}

async function APIMessagev2(message) {
  return console.log(`${chalk.bgBlueBright.black(`[${getCurrentTime()}] API >`)} ${chalk.blueBright(message)}`);
}

function broadcastMessage(message, type) {
  return console.log(`${chalk.bgBlue(`[${getCurrentTime()}] [${type.toUpperCase()}]`)} ${chalk.blue(message)}`);
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export { broadcastMessage };
