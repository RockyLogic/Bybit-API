import chalk from "chalk";

const logSuccess = (message: string) => {
  console.log(
    chalk.greenBright(`[${new Date().toLocaleTimeString()}] ${message}`)
  );  
};

const logStatus = (message: string) => {
  console.log(
    chalk.cyanBright(`[${new Date().toLocaleTimeString()}] ${message}`)
  );
};

const logError = (message: string) => {
  console.log(
    chalk.redBright(`[${new Date().toLocaleTimeString()}] ${message}`)
  );
};

const log = (message: string) => {
  console.log(
    chalk.yellowBright(`[${new Date().toLocaleTimeString()}] ${message}`)
  );
};

export { logSuccess, logStatus, logError, log };
