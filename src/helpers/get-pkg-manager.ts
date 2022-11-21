import path from "node:path";

export type PackageManager = "npm" | "pnpm" | "yarn";

export function getPkgManager(): PackageManager {
  // if yarn.lock exists, use yarn
  if (path.join(process.cwd(), "yarn.lock")) {
    return "yarn";
  } else if (path.join(process.cwd(), "pnpm-lock.yaml")) {
    return "pnpm";
  } else {
    return "npm";
  }
}
