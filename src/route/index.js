const router = require("koa-router")();
import upload from "./upload";
router.use("/upload", upload.routes(), upload.allowedMethods());


router.get("/",async (ctx,next) => {
  await ctx.render("index")
})


export default router;