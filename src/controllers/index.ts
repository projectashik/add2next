import chalk from "chalk"
import loading from "loading-cli"
import {existsSync} from 'fs'
import { print } from "../utils"
import util from 'node:util'
import child from 'node:child_process'


const exec = util.promisify(child.exec);


const stylesContent = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;

export const addTailwind = async () => {
    let pm = "npm"
  if(existsSync("./yarn.lock")){
    pm = "yarn"
  }
  let px = pm === "npm"? "npx" : "yarn"

  print(`${chalk.green("Adding tailwind css to your project")}`)
  await exec(`${pm} add tailwindcss postcss autoprefixer -D`)

  print(`${chalk.green("Creating tailwind.config.js")}`)
  await exec(`${px} tailwindcss init -p`)

  // append stylesContent in styles/global.css
await exec(`echo "${stylesContent}" >> ./styles/globals.css`)
  print(chalk.green("Tailwind implemented successfully"));
  process.exit(1)
}
