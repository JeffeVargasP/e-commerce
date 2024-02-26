const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.getAllOrders);
router.get("/id/:id", OrderController.getOrderById);
router.get("/user/:userId", OrderController.getOrderByUserId);
router.get("/product/:productId", OrderController.getOrderByProductId);
router.post("/", OrderController.createOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
