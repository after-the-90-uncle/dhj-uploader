#!/usr/bin/env node
import koa from "koa";
import route from "./route";
import koaBody from "koa-body";
import views from "koa-views";
import path from "path";
import fs from "fs";
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
const app =  new koa();
app.use(views(path.join(__dirname,".."), {
  extension: "html",
}));

// app.use(require("koa-logger")());


app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 100 * 1024 * 1024 * 1024, 
    maxFileSize: 100 * 1024 * 1024 * 1024,
    uploadDir: process.cwd(), 
    keepExtensions: true, 
    onFileBegin:(name, file) => {
       const dir = process.cwd();
       if (!fs.existsSync(dir)){
         fs.mkdirSync(dir);
       }
       const filePath = path.join(dir, file.originalFilename);
       file.filepath = filePath;
    },
  },
}));
app.use(route.routes()).use(route.allowedMethods());
const server = require('http').createServer(app.callback());
server.listen(port);
server.timeout = 24 * 60 * 60;

console.log("上传目录：",`${process.cwd()}`.green.underline);
for (let item in networkInterfaces) {
  networkInterfaces[item].forEach(details => {
    if (details.family === 'IPv4' && !details.internal) {
      console.log(`http://${details.address}:${port}`.green.underline);
    }
  });
}


