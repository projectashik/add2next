import fs from "fs";
import path from "path";
export async function folderExists(path: string): Promise<boolean> {
  try {
    await fs.promises.access(path);
    return true;
  } catch (err) {
    return false;
  }
}

export async function doesAppFolderExist(): Promise<boolean> {
  const appFolder = process.cwd();
  const appFolderPath = path.join(appFolder, "app");
  return await folderExists(appFolderPath);
}
