const router = require("koa-router")();
const fs = require("fs");
const path = require("path");
import upload from "./upload";
router.use("/upload", upload.routes(), upload.allowedMethods());

// router.get("/upload", async (ctx, next) => {
//   await ctx.render("upload");
// });

router.get("/", async (ctx, next) => {
  await ctx.render("index");
});

// function showDir() {
//   const directoryPath = process.cwd();

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error("Unable to scan directory: " + err);
//       return;
//     }

//     // 遍历文件列表
//     files.forEach((file) => {
//       const filePath = path.join(directoryPath, file);

//       // 使用fs.lstat或fs.stat来获取文件状态
//       fs.lstat(filePath, (err, stats) => {
//         if (err) {
//           console.error("Error getting file status: " + err);
//           return;
//         }

//         let type = "";
//         if (stats.isDirectory()) {
//           type = "Directory";
//         } else if (stats.isFile()) {
//           type = "File";
//         } else if (stats.isSymbolicLink()) {
//           type = "Symbolic Link";
//         } else {
//           type = "Unknown";
//         }

//         // 获取文件权限
//         const permissions = stats.mode & parseInt("777", 8); // 获得八进制权限码

//         console.log(`"${file}" is a ${type} with permissions: ${permissions.toString(8)}`);
//       });
//     });
//   });
// }

export default router;
