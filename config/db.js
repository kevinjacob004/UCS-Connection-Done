const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ucs", "root", "kevin2004@123", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Set to true for debugging SQL queries
});

// Test connection
sequelize.authenticate()
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Database connection error:", err));

module.exports = sequelize;
