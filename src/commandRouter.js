import { up, cd, ls } from '../commands/navigation.js';
import { cat, add, mkdir, rn, cp, mv, rm } from '../commands/basics.js';
import { osCommand } from '../commands/osCommand.js';
import { hash } from '../commands/hash.js';
import { compress, decompress } from '../commands/zlib.js';


export async function commandRouter(input) {
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case 'up': {
        up();
        break;
      }

      case 'cd': {
        cd(args);
        break;
      }

      case 'ls': {
        ls();
        break;
      }

      case 'cat': {
        cat(args);
        break;
      }

      case 'add': {
        add(args);
        break;
      }

      case 'mkdir': {
        mkdir(args);
        break;
      }

      case 'rn': {
        rn(args);
        break;
      }

      case 'cp': {
        cp(args);
        break;
      }

      case 'mv': {
        mv(args);
        break;
      }

      case 'rm': {
        rm(args);
        break;
      }

      case 'os': {
        osCommand(args);
        break;
      }

      case 'hash': {
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
      }

      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
}