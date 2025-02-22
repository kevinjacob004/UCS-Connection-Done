const express = require("express");
const router = express.Router();
const { Thread, Message, User } = require("../models");
const authenticateToken = require("../middleware/auth");



// Create a new post (thread)
router.post("/threads", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const user_id = req.user.id; // Get the logged-in user's ID from the token

    const newThread = await Thread.create({ user_id, title, content });
    res.status(201).json(newThread);
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ error: "An error occurred while creating the thread" });
  }
});

// Get all posts (threads)
router.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.findAll({
      include: [
        { 
          model: User, 
          attributes: ["id", "first_name", "last_name", "username"], // Include user details
        },
      ],
      order: [["created_at", "DESC"]], // Sort by latest first
    });
    res.status(200).json(threads);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ error: "An error occurred while fetching threads" });
  }
});

// Create a new comment (message)
router.post("/messages", authenticateToken, async (req, res) => {
  try {
    const { thread_id, message_content } = req.body;

    // Validate input
    if (!thread_id || !message_content) {
      return res.status(400).json({ error: "Thread ID and message content are required" });
    }

    const user_id = req.user.id; // Get the logged-in user's ID from the token

    const newMessage = await Message.create({ thread_id, user_id, message_content });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "An error occurred while creating the message" });
  }
});

// Get all messages (comments)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        { 
          model: User, 
          attributes: ["id", "first_name", "last_name", "username"], // Include user details
        },
        { 
          model: Thread, 
          attributes: ["title"], // Include the thread the message belongs to
        },
      ],
      order: [["created_at", "DESC"]], // Sort by latest first
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "An error occurred while fetching messages" });
  }
});

// Get messages for a specific thread
router.get("/threads/:thread_id/messages", async (req, res) => {
  try {
    const { thread_id } = req.params;

    const messages = await Message.findAll({
      where: { thread_id }, // Filter by thread ID
      include: [
        { 
          model: User, 
          attributes: ["id", "first_name", "last_name", "username"], // Include user details
        },
      ],
      order: [["created_at", "ASC"]], // Sort by oldest first (for chronological order)
    });

    if (!messages.length) {
      return res.status(404).json({ error: "No messages found for this thread" });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching thread messages:", error);
    res.status(500).json({ error: "An error occurred while fetching thread messages" });
  }
});

module.exports = router;