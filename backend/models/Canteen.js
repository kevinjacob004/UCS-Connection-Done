// models/MenuItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const MenuItem = sequelize.define('MenuItem', {
    menu_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    item_name: { type: DataTypes.STRING, allowNull: false },
    item_description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    available_from: { type: DataTypes.TIME, allowNull: false },
    available_to: { type: DataTypes.TIME, allowNull: false },
}, { timestamps: true });

module.exports = MenuItem;

// models/Order.js
const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false, references: { model: 'Users', key: 'id' } },
    order_status: { type: DataTypes.ENUM('placed', 'ready'), defaultValue: 'placed' },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
    reservation_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { timestamps: true });

module.exports = Order;

// models/OrderItem.js
const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.BIGINT, references: { model: 'Orders', key: 'order_id' } },
    item_id: { type: DataTypes.BIGINT, references: { model: 'MenuItems', key: 'menu_id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: false });

module.exports = OrderItem;
