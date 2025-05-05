import fs from 'fs';
import path from 'path';

export const cat = (filePath) => {
  let currentDir = process.cwd();
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(currentDir, filePath);

  const readableStream = fs.createReadStream(resolvedPath, { encoding: 'utf-8' });

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  readableStream.on('end', () => {
    console.log('\nFile reading completed.');
  });
};

export const add = (fileName) => {
  const absolutePath = path.resolve(fileName);

  fs.writeFile(absolutePath, '', (err) => {
    if (err) {
      console.error(`Error creating file: ${err.message}`);
    } else {
      console.log(`File "${fileName}" created successfully.`);
    }
  });
};

export const mkdir = (directoryName) => {
  const absolutePath = path.resolve(directoryName);

  fs.mkdir(absolutePath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err.message}`);
    } else {
      console.log(`Directory "${directoryName}" created successfully.`);
    }
  });
};

export const rn = (filePath, newFileName) => {
  const absolutePath = path.resolve(filePath);
  const newAbsolutePath = path.resolve(path.dirname(filePath), newFileName);

  fs.rename(absolutePath, newAbsolutePath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log(`File renamed to "${newFileName}" successfully.`);
    }
  });
};

export const cp = (filePath, newDirectoryPath) => {
  const absolutePath = path.resolve(filePath);
  const newAbsolutePath = path.resolve(newDirectoryPath, path.basename(filePath));

  const readableStream = fs.createReadStream(absolutePath);
  const writableStream = fs.createWriteStream(newAbsolutePath);

  readableStream.pipe(writableStream);

  readableStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  writableStream.on('error', (err) => {
    console.error(`Error writing file: ${err.message}`);
  });

  writableStream.on('finish', () => {
    console.log(`File copied to "${newAbsolutePath}" successfully.`);
  });
};

export const mv = (filePath, newDirectoryPath) => {
  const absolutePath = path.resolve(filePath);
  const newAbsolutePath = path.resolve(newDirectoryPath, path.basename(filePath));

  const readableStream = fs.createReadStream(absolutePath);
  const writableStream = fs.createWriteStream(newAbsolutePath);

  readableStream.pipe(writableStream);

  readableStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  writableStream.on('error', (err) => {
    console.error(`Error writing file: ${err.message}`);
  });

  writableStream.on('finish', () => {
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(`Error deleting original file: ${err.message}`);
      } else {
        console.log(`File moved to "${newAbsolutePath}" successfully.`);
      }
    });
  });
};

export const rm = (filePath) => {
  const absolutePath = path.resolve(filePath);

  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File "${filePath}" deleted successfully.`);
    }
  });
};
