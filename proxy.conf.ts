//import { express } from "@r35007/mock-server";

const route = '/api/*';

const config = {
  target: "http://localhost:8080",
  changeOrigin: true,
  secure: false,
  logLevel: "debug",
};

const PROXY_CONFIG ={
  [route]: config,
}

module.exports = PROXY_CONFIG;

/*const port = process.env["PORT"] || 8888;

var app = express();
const server = app.listen(port, () => {
  console.info(`Listened at http://localhost:${port}`);
})*/

