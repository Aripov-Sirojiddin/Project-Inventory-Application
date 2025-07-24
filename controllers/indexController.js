const db = require("../models/db.js");
const { validationResult } = require("express-validator");

async function prepareLocals(req) {
  const products = await db.getAllProducts();
  return {
    products: products,
    showForm: req.url === "/new",
    errors: [],
    values: {},
  };
}

async function getAllProducts(req, res) {
  res.render("pages/index", await prepareLocals(req));
}

async function createProduct(req, res) {
  const productValues = {
    ...req.body,
  };
  const errors = validationResult(req).array();
  const locals = {
    ...(await prepareLocals(req)),
    errors: errors,
    values: productValues,
  };
  if (errors.length === 0) {
    db.createProduct(productValues);
    res.redirect("/");
  } else {
    res.render("pages/index", locals);
  }
}

async function getProductById(req, res) {
  const { productId } = req.params;
  const product = await db.getProductById(productId);
  console.log(product)
  res.render("pages/productDetails", { product: product[0] });
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
