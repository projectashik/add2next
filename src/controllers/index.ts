import chalk from "chalk"
import { add, appendToFile, execute, print } from "../utils"

const stylesContent = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;

export const addTailwind = async () => {
  await add(`tailwindcss postcss autoprefixer -D`)
  await execute(`tailwindcss init -p`)
  print(chalk.green("Tailwind implemented successfully"));
  await appendToFile(`./styles/globals.css`, stylesContent);
  process.exit(1)
}
