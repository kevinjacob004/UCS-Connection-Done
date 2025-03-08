// models/MenuItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


// models/Order.js
const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false, references: { model: 'Users', key: 'id' } },
    order_status: { type: DataTypes.ENUM('placed', 'ready'), defaultValue: 'placed' },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
    reservation_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { timestamps: true });

module.exports = Order;