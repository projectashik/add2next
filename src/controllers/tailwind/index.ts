import chalk from "chalk";
import { execute } from "../../helpers/exec";
import { appendToAFile, writeToFile } from "../../helpers/file";
import { getPkgManager } from "../../helpers/get-pkg-manager";
import { install } from "../../helpers/install";
import { getOnline } from "../../helpers/is-online";

export const tailwind = async () => {
  const packageManager = getPkgManager();
  const isOnline = await getOnline();
  const stylesContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;

  const tailwindConfigContent = `
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
`;
  const dependencies = ["tailwindcss", "postcss", "autoprefixer"];
  await install(dependencies, {
    packageManager: packageManager,
    isOnline: isOnline,
    devDependencies: true,
  });
  await execute(`npx tailwindcss init -p`);

  await appendToAFile("./styles/globals.css", stylesContent);
  await writeToFile("./tailwind.config.js", tailwindConfigContent);

  console.log(chalk.green("TailwindCSS implemented successfully"));
};
