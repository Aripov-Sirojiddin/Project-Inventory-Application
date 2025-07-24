const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  updateProduct,
} = require("../controllers/indexController.js");
const validator = require("../validators/productValidator.js");

const indexRouter = Router();

indexRouter.get("/", getAllProducts);
indexRouter.get("/product/:productId", getProductById);
indexRouter.get("/edit/:productId/", editProductById);
indexRouter.post("/edit/:productId/", validator, updateProduct);

indexRouter.get("/new", getAllProducts);
indexRouter.post("/new", validator, createProduct);

module.exports = indexRouter;
