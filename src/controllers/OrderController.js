const Order = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
  const orders = await Order.findAll();

  try {
    if (!orders) {
      res.status(404).send({
        message: "No orders found",
        status: 404,
      });
    }

    res.status(200).send({
      message: "Orders found",
      orders: orders,
      url: "http://localhost:3000/api/order",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting orders",
      status: 500,
    });
  }
};

const getOrderByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
    });

    if (!orders) {
      res.status(404).send({
        message: "No orders found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Orders found",
        orders: orders,
        url: `http://localhost:3000/api/order`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting orders by user id",
      status: 500,
    });
  }
};

const getOrderByProductId = async (req, res) => {
  const productId = req.params.productId;

  try {
    const orders = await Order.findAll({
      where: {
        productId: productId,
      },
    });

    if (!orders) {
      res.status(404).send({
        message: "No orders found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Orders found",
        orders: orders,
        url: `http://localhost:3000/api/order`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting orders by product id",
      status: 500,
    });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByPk(id);

    if (!order || order === null || order === undefined) {
      res.status(404).send({
        message: "Order not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Order found",
        order: order,
        url: `http://localhost:3000/api/order`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting order by id",
      status: 500,
    });
  }
};

const createOrder = async (req, res) => {
  const body = req.body;

  if (!body.total || !body.quantity || !body.productId || !body.userId) {
    res.status(400).send({
      message: "Missing parameters",
      parameters: ["total", "quantity", "productId", "userId"],
      status: 400,
    });
  } else {
    try {
      const order = await Order.create({
        total: body.total,
        quantity: body.quantity,
        productId: body.productId,
        userId: body.userId,
      });

      res.status(201).send({
        message: "Order created",
        order: order,
        url: `http://localhost:3000/api/order`,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error creating order",
        status: 500,
      });
    }
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      res.status(404).send({
        message: "Order not found",
        status: 404,
      });
    } else {
      const deleted = await order.destroy();

      res.status(200).send({
        message: "Order deleted",
        order: deleted,
        url: `http://localhost:3000/api/order`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting order",
      status: 500,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  getOrderByProductId,
  createOrder,
  deleteOrder,
};
