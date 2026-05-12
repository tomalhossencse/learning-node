import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // console.log("request : ", req);
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  //   console.log(id);
  // all product

  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrive Successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();

    const singleProduct = products.find((p: Iproduct) => p.id === id) || {};
    console.log(singleProduct);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "single Products Retrive Successfully",
        data: singleProduct,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log("new product : ", newProduct);
    products.push(newProduct); // full array [] after insert
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created Successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: Iproduct) => p.id === id);
    // console.log(index);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
          data: null,
        }),
      );
    }
    // console.log(products[index]);
    products[index] = {
      id: products[index].id,
      ...body,
    };

    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated Successfully",
        data: products[index],
      }),
    );
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "route not found" }));
  }
};
