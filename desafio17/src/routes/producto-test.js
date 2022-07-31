import { Router } from "express";
import logger from "../log4js/logger.js";
import { array as productosTest } from "../test/productosTest.js";

export const produTest = Router();

produTest.get("/", (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.render("productListTest", { productosTest });
});
