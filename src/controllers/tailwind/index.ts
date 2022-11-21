import chalk from "chalk";
import prompts from "prompts";
import { execute } from "../../helpers/exec";
import { appendToAFile, writeToFile } from "../../helpers/file";
import { doesAppFolderExist } from "../../helpers/folder-exists";
import { getPkgManager } from "../../helpers/get-pkg-manager";
import { install } from "../../helpers/install";
import { getOnline } from "../../helpers/is-online";

import PackageJson from "@npmcli/package-json";

export const tailwind = async (turbo: boolean) => {
  const packageManager = getPkgManager();
  const isOnline = await getOnline();
  const appFolderExists = await doesAppFolderExist();
  const pkgJson = await PackageJson.load(process.cwd());

  const { packages } = await prompts([
    {
      type: "multiselect",
      name: "packages",
      message:
        "Do you want to install any of the additional tailwind packages?",
      choices: [
        { title: "@tailwindcss/forms", value: "@tailwindcss/forms" },
        { title: "@tailwindcss/typography", value: "@tailwindcss/typography" },
        {
          title: "@tailwindcss/aspect-ratio",
          value: "@tailwindcss/aspect-ratio",
        },
        {
          title: "@tailwindcss/line-clamp",
          value: "@tailwindcss/line-clamp",
        },
        {
          title: "@tailwindcss/container-queries",
          value: "@tailwindcss/container-queries",
        },
      ],
    },
  ]);

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
    plugins: [${packages.map((pkg: string) => `require("${pkg}")`).join(", ")}],
};
`;

  console.log(chalk.green("Using package manager: " + packageManager));

  const dependencies = ["tailwindcss", "postcss", "autoprefixer", ...packages];
  if (turbo) {
    dependencies.push("concurrently");
    const indexOfPost = dependencies.indexOf("postcss");
    dependencies.splice(indexOfPost, 1);

    pkgJson.update({
      scripts: {
        ...pkgJson.content.scripts,
        tailwind: "tailwindcss --input tailwind.css --output app/globals.css",
        dev: 'concurrently "next dev --turbo" "tailwind --watch"',
        build: "tailwind && next build",
      },
    });

    await pkgJson.save();
    console.log(chalk.green("Added scripts to package.json."));
  }

  await install(dependencies, {
    packageManager: packageManager,
    isOnline: isOnline,
    devDependencies: true,
  });
  await execute(`npx tailwindcss init -p`);
  console.log(
    chalk.green("Created tailwind.config.js & postcss.config.js files.")
  );

  if (appFolderExists) {
    await appendToAFile("./app/globals.css", stylesContent);
  } else {
    await appendToAFile("./styles/globals.css", stylesContent);
  }
  await writeToFile("./tailwind.config.js", tailwindConfigContent);

  console.log(chalk.green("TailwindCSS implemented successfully"));
};
