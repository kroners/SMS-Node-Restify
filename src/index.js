import routes from "./routes";

const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const Router = require("restify-router").Router;

const routerIns = new Router();
const port = process.env.PORT || 3000;

const cors = corsMiddleware({
  allowHeaders: ["X-App-Version"],
  exposeHeader: [],
  origin: ["*"]
});

const server = restify.createServer({
  name: "demoSMSNode"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

routerIns.add("/demo", routes);
routerIns.applyRoutes(server);

server.get("/", (req, res) => {
  res.json({
    date: Date.now(),
    service: process.env.APPLICATION,
    version: "v1"
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
