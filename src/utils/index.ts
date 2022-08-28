import { existsSync } from "fs"

import util from 'node:util'
import child from 'node:child_process'
import chalk from "chalk";
import loading from "loading-cli";


export const exec = util.promisify(child.exec);



export const print = (args : any) => {
    console.log(args)
}

export const getPM = () => {
    let pm = "npm"
  if(existsSync("./yarn.lock")){
    pm = "yarn"
  }
  let px = pm === "npm"? "npx" : "yarn"
  return   {pm, px}
}

export const add = async (cmd: string) => {
    const {pm} = getPM();
    let pmCmd;
    if(pm === "npm") {
        pmCmd = "npm install"
    } else {
        pmCmd = "yarn add"
    }
    const load = loading(`${chalk.green("Executing")} ${chalk.yellow(`${pmCmd} ${cmd}`)}`)
    load.start();
    const { stderr, stdout } = await exec(`${pmCmd} ${cmd}`);
    load.stop();
    return {stderr, stdout}
}

export const execute = async (cmd: string) => {
    const {px} = getPM();
    const load = loading(`${chalk.green("Executing")} ${chalk.yellow(`${px} ${cmd}`)}`)
    const { stderr, stdout } = await exec(`${px} ${cmd}`);
    load.stop();
    return {stderr, stdout}
}

export const appendToFile = async (file: string, content: any) => {
    await exec(`echo "${content}" >> ${file}`)
}