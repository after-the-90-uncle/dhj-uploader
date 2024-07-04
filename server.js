const http = require('http');
const url = require("url");

// 定义主机名和端口号
const port = 3000;

const postRequest = {};
const getRequest = {};
// 创建服务器对象
const server = http.createServer((req, res) => {
  // 设置响应头，状态码200表示请求成功，内容类型为text/plain
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');
  // // 响应内容
  // res.end(fs.readFileSync("index.html").toString());

  const parsedUrl = url.parse(req.url, true);

  // 处理根路径的GET请求
  if (req.method === 'GET' && getRequest[parsedUrl.pathname]) {
    res.statusCode = 200;
    getRequest[parsedUrl.pathname](req,res)
  // 处理根路径的POST请求
  } else if (req.method === 'POST' &&postRequest[parsedUrl.pathname] ) {
    let body = '';

    // 监听data事件，接收数据块
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // 监听end事件，处理接收到的数据
    req.on('end', async () => {
      const parsedBody = querystring.parse(body);
      req.body = parsedBody
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      const res = await postRequest[parsedUrl.pathname]()
      res.end(JSON.stringify({success:true,data:res}));
    });

  // 处理其他路径
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

// 服务器监听指定的主机名和端口号
server.listen(port, "::", (e) => {
  console.log(e)
  console.log(`Server port ${port}`);
});

module.exports = {
  get(path,callback){
    getRequest[path] = callback
  },
  post(path,callback){
    postRequest[path] = callback
  }
}
