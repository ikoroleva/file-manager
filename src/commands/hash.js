import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export const hash = async (filePath) => {
  try {
    const fileBuffer = await readFile(filePath);
    const hash = createHash('sha256').update(fileBuffer).digest('hex');
    console.log(hash);
  } catch (error) {
    console.error('Error calculating hash:', error.message);
  }
};