const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const n = url.searchParams.get('n');
  const m = url.searchParams.get('m');

  if (n && m) {
    const line = fs.readFileSync(`/tmp/data/${n}.txt`, 'utf8').split('\n')[m - 1];
    res.end(line);
  } else if (n) {
    const content = fs.readFileSync(`/tmp/data/${n}.txt`, 'utf8');
    res.end(content);
  } else {
    res.statusCode = 400;
    res.end('Invalid request');
  }
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
