import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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
    try {
      const products = readProduct();

      return sendResponse(
        res,
        200,
        true,
        "Products Retrive successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went Wrong !", error);
    }
  } else if (method === "GET" && id !== null) {
    const products = readProduct();

    const singleProduct = products.find((p: Iproduct) => p.id === id);

    console.log(singleProduct);

    if (!singleProduct) {
      return sendResponse(res, 404, false, "product not found");
    } else {
      try {
        return sendResponse(
          res,
          200,
          true,
          "single product retrive Successfully",
          singleProduct,
        );
      } catch (error) {
        return sendResponse(res, 500, false, "something went wrong !", error);
      }
    }
  } else if (method === "POST" && url === "/products") {
    try {
      const body = await parseBody(req);
      const products = readProduct();
      const newProduct = {
        id: Date.now(),
        ...body,
      };
      // console.log("new product : ", newProduct);
      products.push(newProduct); // full array [] after insert
      insertProduct(products);
      return sendResponse(
        res,
        200,
        true,
        "Product created Successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "something went wrong !", error);
    }
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: Iproduct) => p.id === id);
    // console.log(index);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product Not Found", null);
    }
    // console.log(products[index]);

    try {
      products[index] = {
        id: products[index].id,
        ...body,
      };

      insertProduct(products);
      return sendResponse(
        res,
        200,
        true,
        "Product updated Successfully",

        products[index],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "something went wrong !", error);
    }
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product Not Found", null);
    }

    try {
      products.splice(index, 1);

      insertProduct(products);

      return sendResponse(res, 200, true, "Product deleted Successfully");
    } catch (error) {
      return sendResponse(res, 500, false, "Something went Wrong !", error);
    }
  } else {
    return sendResponse(res, 404, false, "route not found", null);
  }
};
