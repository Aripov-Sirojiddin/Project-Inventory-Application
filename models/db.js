const pool = require("./pool.js");

async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
}

async function createProduct(product) {
  await pool.query(
    `
    INSERT INTO products (category, title, description, price, rating)
    VALUES($1, $2, $3, $4, $5);
  `,
    [
      product.category,
      product.title,
      product.description,
      product.price,
      product.rating,
    ]
  );
}

async function getProductById(id) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);

  return rows[0];
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
