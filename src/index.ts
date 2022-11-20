#!/usr/bin/env node

import cac from "cac";
import { tailwind } from "./controllers";

const cli = cac();

cli
  .command("tailwind", "Add tailwind css to your Next.js project")
  .action(tailwind);

cli.help();
cli.version("0.0.12");
cli.parse();
