const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/indexController.js");
const validator = require("../validators/productValidator.js");

const indexRouter = Router();

indexRouter.get("/", getAllProducts);
indexRouter.get("/product/:productId", getProductById);
indexRouter.get("/edit/:productId/", editProductById);
indexRouter.put("/edit/:productId/", validator, updateProduct);
indexRouter.delete("/delete/:productId/", deleteProduct);

indexRouter.get("/new", getAllProducts);
indexRouter.post("/new", validator, createProduct);

module.exports = indexRouter;
