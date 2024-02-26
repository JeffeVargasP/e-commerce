const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.getAllProducts);
router.get("/category/:category", ProductController.getProductByCategory);
router.get("/id/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
