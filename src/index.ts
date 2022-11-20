#!/usr/bin/env node

import cac from "cac";
import { tailwind } from "./controllers";

const cli = cac();

cli
  .command("tailwindcss", "Add tailwind css to your Next.js project")
  .alias("tailwind")
  .option("--turbo", "Use turbopack mode")
  .action((options) => tailwind(options.turbo));

cli.help();
cli.version("0.0.12");
cli.parse();
