import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.l og(req.method);

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
      // console.log("this is Root Route");

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is root Route" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is Products Route" }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "route not found" }));
    }
  },
);

server.listen(3000, () => {
  console.log("server is running on the port 5000");
});
