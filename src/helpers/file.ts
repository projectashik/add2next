import fs from "fs";
import path from "path";
import { makeDir } from "./make-dir";

export async function writeToFile(
  file: string,
  content: string
): Promise<void> {
  const dir = path.dirname(file);

  await makeDir(dir);
  await fs.promises.writeFile(file, content);
}

export async function appendToAFile(
  file: string,
  content: string
): Promise<void> {
  const dir = path.dirname(file);

  await makeDir(dir);
  await fs.promises.appendFile(file, content);
}
