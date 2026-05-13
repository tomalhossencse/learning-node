import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";
import { routeHandler } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.l og(req.method);
    routeHandler(req, res);
  },
);

server.listen(3000, () => {
  console.log("server is running on the port 3000");
});
