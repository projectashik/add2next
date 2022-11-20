import chalk from "chalk";
import loading from "loading-cli";
import child from "node:child_process";

import util from "node:util";

export const exec = util.promisify(child.exec);

export const execute = async (cmd: string) => {
  const load = loading(`${chalk.green("Executing")} ${chalk.yellow(`${cmd}`)}`);
  const { stderr, stdout } = await exec(`${cmd}`);
  load.stop();
  return { stderr, stdout };
};
