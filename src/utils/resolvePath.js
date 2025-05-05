import path from 'path';

export const resolvePath = (...segments) => {
  if (segments.length === 0) {
    return process.cwd();
  }

  const [first, ...rest] = segments;
  return path.isAbsolute(first)
    ? path.resolve(first, ...rest)
    : path.resolve(process.cwd(), ...segments);
};