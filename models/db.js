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
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1;", [
    id,
  ]);
  return rows[0];
}

async function updateProduct(product) {
  await pool.query(
    `
    UPDATE products
    SET category=$2, title=$3, description=$4, price=$5, rating=$6
    WHERE id=$1;
    `,
    [
      product.id, //1
      product.category, //2
      product.title, //3
      product.description, //4
      product.price, //5
      product.rating, //6
    ]
  );
}
async function getFilteredProducts(filter) {
  const { rows } = await pool.query(
    `SELECT * FROM products WHERE title ILIKE $1 OR description ILIKE $1;`,
    [`%${filter}%`]
  );
  return rows;
}
async function deleteProductById(id) {
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById,
  getFilteredProducts,
};
