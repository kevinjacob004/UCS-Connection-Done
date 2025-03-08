// models/MenuItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// models/OrderItem.js
const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.BIGINT, references: { model: 'Orders', key: 'order_id' } },
    item_id: { type: DataTypes.BIGINT, references: { model: 'MenuItems', key: 'menu_id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: false });

module.exports = OrderItem;
