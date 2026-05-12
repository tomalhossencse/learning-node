import type { IncomingMessage } from "http";

export const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((reslove, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        reslove(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};
