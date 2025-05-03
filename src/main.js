import os from 'os';
import { commandRouter } from './commandRouter';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
console.log(`Welcome to the File Manager, ${username}!`);

process.chdir(os.homedir());

const currentDir = process.cwd();
console.log(`You are currently in ${currentDir}`);

process.stdin.on('data', data => {
  const input = data.toString().trim();
  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  }
  commandRouter(input);

});

process.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});