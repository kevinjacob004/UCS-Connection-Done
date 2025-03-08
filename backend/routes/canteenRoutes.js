const express = require('express');
const { MenuItem } = require('../models'); // Import the MenuItem model
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// 🔹 Add a menu item (Only Canteen Staff)
router.post('/menu', authenticateToken, async (req, res) => {
    try {
        // Extract data from the request body
        const { item_name, item_description, price, quantity, available_from, available_to } = req.body;

        // Validate required fields
        if (!item_name || !price || !quantity || !available_from || !available_to) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new menu item in the database
        const newItem = await MenuItem.create({
            item_name,
            item_description,
            price,
            quantity,
            available_from,
            available_to
        });

        // Return the newly created item
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ error: 'Error adding menu item' });
    }
});


// 🔹 Get all menu items (Accessible to all users)
router.get('/fmenu', async (req, res) => {
    try {
        // Fetch all menu items from the database
        const menuItems = await MenuItem.findAll();

        // Check if any items were found
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ error: 'No menu items found' });
        }

        // Return the menu items
        res.json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ error: 'Error fetching menu items' });
    }
});


module.exports = router;