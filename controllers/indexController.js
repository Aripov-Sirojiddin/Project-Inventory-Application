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
    ...await prepareLocals(req),
    errors: errors,
    values: productValues,
  };
  if (errors.length === 0) {
    console.log(productValues);
    console.log("Added");
    res.redirect("/");
  } else {
    res.render("pages/index", locals);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
};
