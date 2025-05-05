import fs from 'fs';
import path from 'path';
import { writeFile, mkdir, rename, unlink } from 'fs/promises';
import { resolvePath } from '../utils/resolvePath.js';

export const cat = (filePath) => {
  return new Promise((resolve, reject) => {
    const resolvedPath = resolvePath(filePath);
    const readableStream = fs.createReadStream(resolvedPath, { encoding: 'utf-8' });

    readableStream.on('data', chunk => {
      process.stdout.write(chunk);
    });

    readableStream.on('error', err => {
      console.error(`Error reading file: ${err.message}`);
      reject(err);
    });

    readableStream.on('end', () => {
      console.log('\nFile reading completed.');
      resolve();
    });
  });
};

export const add = async (fileName) => {
  try {
    const resolvedPath = resolvePath(fileName);
    await writeFile(resolvedPath, '');
    console.log(`File "${fileName}" created successfully.`);
  } catch (err) {
    console.error(`Error creating file: ${err.message}`);
  }
};

export const makedir = async (directoryName) => {
  try {
    const resolvedPath = resolvePath(directoryName);

    await mkdir(resolvedPath, { recursive: true });
    console.log(`Directory "${resolvedPath}" created successfully.`);
  } catch (err) {
    console.error(`Error creating directory: ${err.message}`);
  }
};

export const rn = async (filePath, newFileName) => {
  try {
    const resolvedPath = resolvePath(filePath);
    const newResolvedPath = resolvePath(path.dirname(filePath), newFileName);

    await rename(resolvedPath, newResolvedPath);
    console.log(`File renamed to "${newFileName}" successfully.`);
  }
  catch (err) {
    console.error(`Error renaming file: ${err.message}`);
  }
};

export const cp = async (filePath, newDirectoryPath) => {
  return new Promise((resolve, reject) => {
    const source = resolvePath(filePath);
    const dest = resolvePath(newDirectoryPath, path.basename(filePath));

    const readableStream = fs.createReadStream(source);
    const writableStream = fs.createWriteStream(dest);

    readableStream.pipe(writableStream);

    readableStream.on('error', (err) => {
      console.error(`Error reading file: ${err.message}`);
      reject(err);
    });

    writableStream.on('error', (err) => {
      console.error(`Error writing file: ${err.message}`);
      reject(err);
    });

    writableStream.on('finish', () => {
      console.log(`File copied to "${dest}" successfully.`);
      resolve();
    });
  });
}

export const mv = async (filePath, newDirectoryPath) => {
  return new Promise((resolve, reject) => {
    const source = resolvePath(filePath);
    const dest = resolvePath(newDirectoryPath, path.basename(filePath));

    const readableStream = fs.createReadStream(source);
    const writableStream = fs.createWriteStream(dest);

    readableStream.pipe(writableStream);

    readableStream.on('error', (err) => {
      console.error(`Error reading file: ${err.message}`);
      reject(err);
    });

    writableStream.on('error', (err) => {
      console.error(`Error writing file: ${err.message}`);
      reject(err);
    });

    writableStream.on('finish', async () => {
      try {
        await unlink(source);
        console.log(`File moved to "${dest}" successfully.`);
        resolve();
      } catch (err) {
        console.error(`Error deleting original file: ${err.message}`);
        reject(err);
      }
    });
  });
};

export const rm = async (filePath) => {
  try {
    const resolvedPath = resolvePath(filePath);

    await unlink(resolvedPath);
    console.log(`File "${filePath}" deleted successfully.`);
  } catch (err) {
    console.error(`Error deleting file: ${err.message}`);
  }
};
