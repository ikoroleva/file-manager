import os from 'os';

export const osCommand = (command) => {
  switch (command) {
    case '--EOL':
      console.log('End-Of-Line:', JSON.stringify(os.EOL));
      break;

    case '--cpus':
      const cpus = os.cpus();
      console.log(`Number of CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: Model: ${cpu.model}, Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;

    case '--homedir':
      console.log('Home Directory:', os.homedir());
      break;

    case '--username':
      console.log('System User Name:', os.userInfo().username);
      break;

    case '--arch':
    case '--architecture':
      console.log('CPU Architecture:', os.arch());
      break;

    default:
      console.log('Invalid command. Please use one of the following: --EOL, --cpus, --homedir, --username, --architecture');
  }
}