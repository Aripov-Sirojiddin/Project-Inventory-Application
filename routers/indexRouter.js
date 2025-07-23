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
  body("title")
    .trim()
    .notEmpty()
    .withMessage("There is no product without proper title."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("A product must have a proper description for search."),
  body("price")
    .trim()
    .isNumeric()
    .withMessage("Must be a positive number."),
  body("rating")
    .trim()
    .isNumeric()
    .withMessage("Must be a number between 0 and 5."),
  createProduct
);

module.exports = indexRouter;
