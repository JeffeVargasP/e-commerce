const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize");
const User = require("./UserModel");

const Order = sequelize.define("Order", {
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

Order.sync();

module.exports = Order;
