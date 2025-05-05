import { up, cd, ls } from './commands/navigation.js';
import { cat, add, mkdir, rn, cp, mv, rm } from './commands/basics.js';
import { osCommand } from './commands/osCommand.js';
/* import { hash } from './commands/hash.js';
import { compress, decompress } from './commands/zlib.js'; */


export async function commandRouter(input) {
  const [command, path, newPath] = input.split(' ');

  try {
    switch (command) {
      case 'up': {
        up();
        break;
      }

      case 'cd': {
        cd(path);
        break;
      }

      case 'ls': {
        ls();
        break;
      }

      case 'cat': {
        await cat(path);
        break;
      }

      case 'add': {
        add(path);
        break;
      }

      case 'mkdir': {
        mkdir(path);
        break;
      }

      case 'rn': {
        rn(path, newPath);
        break;
      }

      case 'cp': {
        cp(path, newPath);
        break;
      }

      case 'mv': {
        mv(path, newPath);
        break;
      }

      case 'rm': {
        rm(path);
        break;
      }

      case 'os': {
        osCommand(path);
        break;
      }

      /* case 'hash': {
        hash(args);
        break;
      }

      case 'compress': {
        compress(args);
        break;
      }

      case 'decompress': {
        decompress(args);
        break;
      } */

      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
}