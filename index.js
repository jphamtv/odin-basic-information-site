const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename = "." + q.pathname;

  if (filename === './') {
    filename = './index.html';
  } else {
    if (!path.extname(filename)) {
      filename += '.html';
    }
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      fs.readFile('./404.html', (err404, data404) => {
        if (err404) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('404 Not Found');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data404);
          return res.end();
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);