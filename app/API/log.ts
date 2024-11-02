function broadcastMessage(message: string, type: string) {
  const blue = '\x1b[34m';
  const bgBlue = '\x1b[44m';
  const reset = '\x1b[0m';
  return console.log(`${bgBlue}[${getCurrentTime()}] [${type.toUpperCase()}]${reset} ${blue}${message}${reset}`);
}

async function logCallMessage(message: string) {
  const yellow = '\x1b[33m';
  const bgYellow = '\x1b[43m';
  const black = '\x1b[30m';
  const reset = '\x1b[0m';
  return console.log(`${bgYellow}${black}[${getCurrentTime()}] API >${reset} ${yellow}${message}${reset}`);
}

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

export { broadcastMessage, logCallMessage };
