let products = [
  {
    category: "Clothing",
    title: "Adibas - Waterproof Winbreaker",
    description: "An awesome windbreaker for the Spring season.",
    price: 39.99,
    rating: 4.5,
  },
  {
    category: "Clothing",
    title: "Adibas - Waterproof Winbreaker",
    description: "An awesome windbreaker for the Spring season.",
    price: 39.99,
    rating: 4.5,
  },
  {
    category: "Clothing",
    title: "Adibas - Waterproof Winbreaker",
    description: "An awesome windbreaker for the Spring season.",
    price: 39.99,
    rating: 4.5,
  },
];

const pool = require("./pool.js");

async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM products");
  return products;
}

async function createProduct(product) {
  // await pool.query(
  //   `
  //   INSERT INTO products (category, title, description, price, rating)
  //   VALUES($1, $2, $3, $4, $5);
  // `,
  //   [
  //     product.category,
  //     product.title,
  //     product.description,
  //     product.price,
  //     product.rating,
  //   ]
  // );
  products.push(product);
}

module.exports = {
  getAllProducts,
  createProduct,
};
