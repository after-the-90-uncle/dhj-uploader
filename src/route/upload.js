const router = require("koa-router")();
const notifier = require('node-notifier');
const formidable = require('formidable');

router.post("/", async (ctx,next) => {
    notifier.notify({
      title: 'dhj-uploader',
      message:`${ctx.request.files.file.originalFilename}上传成功`,
      sound: true, 
      wait: false
    });
  console.log(new Date())
  ctx.body = "ok";
})


export default router;