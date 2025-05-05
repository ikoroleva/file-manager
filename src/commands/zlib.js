import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export const compress = async (source, destination) => {
  try {
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);
    const brotliCompress = createBrotliCompress();

    await pipelineAsync(sourceStream, brotliCompress, destinationStream);
    console.log('File compressed successfully.');
  } catch (error) {
    console.error('Error during compression:', error.message);
  }
};

export const decompress = async (source, destination) => {
  try {
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);
    const brotliDecompress = createBrotliDecompress();

    await pipelineAsync(sourceStream, brotliDecompress, destinationStream);
    console.log('File decompressed successfully.');
  } catch (error) {
    console.error('Error during decompression:', error.message);
  }
};