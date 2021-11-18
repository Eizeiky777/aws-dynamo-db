const http = require('http');
const app = require('./app');

const { env } = process;
const port = Number(env.PORT) || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Backend server AWS DYNAMO-DB is running at localhost:${port}`);
});
