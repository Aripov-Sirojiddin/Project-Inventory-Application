const db = require("../models/db.js");
const { validationResult } = require("express-validator");

async function getAllProducts(req, res) {
  const products = await db.getAllProducts();
  res.render("pages/index", {
    products: products,
    showForm: req.url === "/new",
  });
}

async function createProduct(req, res) {
  req.body
  res.redirect("/");
}

module.exports = {
  getAllProducts,
  createProduct,
};
