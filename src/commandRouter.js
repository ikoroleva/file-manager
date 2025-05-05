import { up, cd, ls } from './commands/navigation.js';
import { cat, add, makedir, rn, cp, mv, rm } from './commands/basics.js';
import { osCommand } from './commands/osCommand.js';
import { hash } from './commands/hash.js';
import { compress, decompress } from './commands/zlib.js';

export async function commandRouter(input) {
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case 'up': {
        up();
        break;
      }
      case 'cd': {
        cd(args[0]);
        break;
      }
      case 'ls': {
        ls();
        break;
      }
      case 'cat': {
        await cat(args[0]);
        break;
      }
      case 'add': {
        await add(args[0]);
        break;
      }
      case 'mkdir': {
        await makedir(args[0]);
        break;
      }
      case 'rn': {
        await rn(args[0], args[1]);
        break;
      }
      case 'cp': {
        await cp(args[0], args[1]);
        break;
      }
      case 'mv': {
        await mv(args[0], args[1]);
        break;
      }
      case 'rm': {
        await rm(args[0]);
        break;
      }
      case 'os': {
        osCommand(args[0]);
        break;
      }
      case 'hash': {
        await hash(args[0]);
        break;
      }
      case 'compress': {
        await compress(args[0], args[1]);
        break;
      }
      case 'decompress': {
        await decompress(args[0], args[1]);
        break;
      }
      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
}