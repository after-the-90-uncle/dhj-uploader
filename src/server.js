import koa from "koa";
import route from "./route";
import koaBody from "koa-body";
import views from "koa-views";
import path from "path";
import fs from "fs";


const app =  new koa();
let viewsPath = path.resolve(__dirname,"..");
if(process.env.NODE_ENV === "packer"){
  viewsPath = path.resolve(__dirname,"..",'..');
}
app.use(views(viewsPath, {
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
export default app;

