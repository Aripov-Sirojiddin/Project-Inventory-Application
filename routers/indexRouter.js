const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/indexController.js");
const { body } = require("express-validator");

const indexRouter = Router();

indexRouter.get("/", getAllProducts);
indexRouter.get("/new", getAllProducts);
indexRouter.post(
  "/new",
  body("category")
    .trim()
    .custom((value) => {
      if (value === "Select") {
        throw new Error("You must pick a category. Select isn't an option.");
      }
      return true;
    }),
  body("title").trim().notEmpty(),
  createProduct
);

module.exports = indexRouter;
