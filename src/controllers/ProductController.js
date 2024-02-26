const Product = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  const products = await Product.findAll();

  try {
    if (!products) {
      res.status(404).send({
        message: "No products found",
        status: 404,
      });
    }

    res.status(200).send({
      message: "Products found",
      products: products,
      url: "http://localhost:3000/api/product",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting products",
      status: 500,
    });
  }
};

const getProductByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.findAll({
      where: {
        category: category,
      },
    });

    if (!products) {
      res.status(404).send({
        message: "No products found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Products found",
        products: products,
        url: `http://localhost:3000/api/product`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting products by category",
      status: 500,
    });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);

    if (!product || product === null || product === undefined) {
      res.status(404).send({
        message: "Product not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Product found",
        product: product,
        url: `http://localhost:3000/api/product`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting product by id",
      status: 500,
    });
  }
};

const createProduct = async (req, res) => {
  const body = req.body;

  if (
    !body.name ||
    !body.price ||
    !body.description ||
    !body.image ||
    !body.category
  ) {
    res.status(400).send({
      message: "Missing parameters",
      parameters: ["name", "price", "description", "image", "category"],
      status: 400,
    });
  } else {
    try {
      const product = await Product.create({
        name: body.name.toLowerCase(),
        price: body.price,
        description: body.description.toLowerCase(),
        image: body.image,
        category: body.category.toLowerCase(),
      });

      res.status(201).send({
        message: "Product created",
        body: body,
        url: `http://localhost:3000/api/product/id/${product.id}`,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error creating product",
        status: 500,
      });
    }
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (
    !body.name ||
    !body.price ||
    !body.description ||
    !body.image ||
    !body.category
  ) {
    res.status(400).send({
      message: "Missing parameters",
      parameters: ["name", "price", "description", "image", "category"],
      status: 400,
    });
  } else {
    try {
      const product = await Product.findByPk(id);

      if (!product || product === null || product === undefined) {
        res.status(404).send({
          message: "Product not found",
          status: 404,
        });
      } else {
        product.name = body.name;
        product.price = body.price;
        product.description = body.description;
        product.image = body.image;
        product.category = body.category;

        await product.save();

        res.status(200).send({
          message: "Product updated",
          product: product,
          url: `http://localhost:3000/api/product/id/${product.id}`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error updating product",
        status: 500,
      });
    }
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send({
        message: "Product not found",
        status: 404,
      });
    } else {
      const deleted = await product.destroy();

      res.status(200).send({
        message: "Product deleted",
        product: deleted,
        url: `http://localhost:3000/api/product`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting product",
      status: 500,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
