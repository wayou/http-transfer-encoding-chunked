var http = require("http");

function generateChunk(index, response) {
  setTimeout(() => {
    if (index === 5) {
      response.write("end");
      response.end("</body></html>");
    } else {
      response.write(`<p> chunk ${index}</p>`);
    }
  }, index * 1000);
}

function handlerRequest(_request, response) {
  response.setHeader("Content-Type", "text/html; charset=UTF-8");
  response.setHeader("Transfer-Encoding", "chunked");
  response.write(`<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <title>HTTP Transer-Encoding:Chunked Node.js Example</title>
  </head>
  <body>
  <h1>HTTP Transer-Encoding:Chunked Node.js Example</h1>
  `);

  let index = 0;
  while (index <= 5) {
    generateChunk(index, response);
    index++;
  }
}

const server = http.createServer(handlerRequest);
server.listen(3000);
console.log("server started at http://localhost:3000");
