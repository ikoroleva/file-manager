import fs from 'fs';
import path from 'path';
import os from 'os';
import { resolvePath } from '../utils/resolvePath.js';

const isAtRoot = (dir) => {
  return os.homedir() === dir;
}

export const up = () => {
  let currentDir = process.cwd();
  if (isAtRoot(currentDir)) {
    console.log('Already at root directory.');
  } else {
    currentDir = path.dirname(currentDir);
    process.chdir(currentDir);
    console.log(`Moved to: ${currentDir}`);
  }
}

export const cd = (targetPath) => {
  let currentDir = process.cwd();
  if (!targetPath) {
    console.log('Invalid input: "cd" requires a path.');
    return;
  }

  const resolvedPath = resolvePath(targetPath);

  try {
    if (fs.existsSync(resolvedPath) && fs.lstatSync(resolvedPath).isDirectory()) {
      currentDir = resolvedPath;
      process.chdir(resolvedPath);
      console.log(`Changed directory to: ${currentDir}`);
    } else {
      console.log('Operation failed: Path does not exist or is not a directory.');
    }
  } catch {
    console.log('Operation failed.');
  }
}

export const ls = () => {
  try {
    let currentDir = process.cwd();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    const folders = entries
      .filter(entry => entry.isDirectory())
      .map(entry => ({ name: entry.name, type: 'directory' }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => ({ name: entry.name, type: 'file' }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const sorted = [...folders, ...files];

    console.table(sorted);
  } catch {
    console.log('Operation failed.');
  }
}