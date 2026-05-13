import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.l og(req.method);
    routeHandler(req, res);
  },
);

server.listen(config.port, () => {
  console.log(`server is running on the port ${config.port}`);
});
