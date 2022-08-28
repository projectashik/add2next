#!/usr/bin/env node

import cac from "cac"
import { addTailwind } from "./controllers"

const cli = cac()

cli.command("tailwind", "Add tailwind css to your Next.js project").action(addTailwind)

cli.help()
cli.version("0.0.2")
cli.parse()
