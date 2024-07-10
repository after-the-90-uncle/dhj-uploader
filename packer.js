
process.env.NODE_ENV = 'packer';
const colors = require('colors')
const os = require('os');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
  .option('port', {
    alias: 'p',
    type: 'number',
    description: '端口号',
    demandOption: false,
    default: 19999,
  })
  .argv;
const networkInterfaces = os.networkInterfaces();

const port = argv.p;
const app = require('./server/server').default;
app.listen(port);
app.timeout = 24 * 60 * 60;

console.log("上传目录：",`${process.cwd()}`.green.underline);
for (let item in networkInterfaces) {
  networkInterfaces[item].forEach(details => {
    if (details.family === 'IPv4' && !details.internal) {
      console.log(`http://${details.address}:${port}`.green.underline);
    }
  });
}
