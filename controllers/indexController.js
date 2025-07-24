const db = require("../models/db.js");
const { validationResult } = require("express-validator");

async function prepareLocals(req) {
  const products = await db.getAllProducts();
  return {
    products: products,
    showForm: req.url === "/new",
    errors: [],
    values: {},
    action: {
      name: "Create",
      url: req.url,
      method: "",
    },
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
  res.render("pages/productDetails", { product: product, showForm: false });
}

async function editProductById(req, res) {
  const { productId } = req.params;
  const product = await db.getProductById(productId);
  const errors = validationResult(req).array();
  res.render("pages/productDetails", {
    product: product,
    errors: errors,
    showForm: true,
    action: {
      name: "Update",
      url: req.url,
      method: "PUT",
    },
  });
}

async function updateProduct(req, res) {
  const newProductValues = {
    ...req.body,
  };
  const errors = validationResult(req).array();
  if (errors.length === 0) {
    await db.updateProduct(newProductValues);
    res.redirect("/product/" + newProductValues.id);
  } else {
    res.render("pages/productDetails", {
      product: newProductValues,
      errors: errors,
      showForm: true,
      action: {
        name: "Update",
        url: req.url,
        method: "PUT",
      },
    });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  updateProduct,
};
