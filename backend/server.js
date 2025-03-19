const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const homeRoutes = require("./routes/homeRoutes");
const counsellingRoutes = require("./routes/counsellingRoutes");
const counsellingReportRoutes = require("./routes/counsellingReportRoutes");
const canteenRoutes = require("./routes/canteenRoutes");
const Razorpay = require("razorpay");
const crypto = require("crypto");

dotenv.config();
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (replace with your frontend URL in production)
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});
// Store the Socket.io instance in `app`
app.set("io", io);

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle new post event
  socket.on("newPost", (post) => {
    // Broadcast the new post to all connected clients
    io.emit("newPost", post);
  });

  // Handle new comment event
  socket.on("newComment", (comment) => {
    // Broadcast the new comment to all connected clients
    io.emit("newComment", comment);
  });

  // Handle post deletion event
  socket.on("deletePost", (postId) => {
    // Broadcast the post deletion to all connected clients
    io.emit("deletePost", postId);
  });

  // Handle comment deletion event
  socket.on("deleteComment", (commentId) => {
    // Broadcast the comment deletion to all connected clients
    io.emit("deleteComment", commentId);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  // 🔹 Counselling events
  socket.on("newSlotBooked", (booking) => io.emit("newSlotBooked", booking));
  socket.on("slotCancelled", (sessionId) => io.emit("slotCancelled", sessionId));
  socket.on("remarkAdded", (data) => io.emit("remarkAdded", data));
  socket.on("feedbackAdded", (data) => io.emit("feedbackAdded", data));


  // 🔹 Counselling Report events
  socket.on("newReport", (data) => io.emit("newReport", data)); // New report created
  socket.on("reportFetched", (data) => io.emit("reportFetched", data)); // Report fetched

  // 🔹 Canteen events
  socket.on("newMenuItem", (item) => io.emit("newMenuItem", item)); // New menu item added
  socket.on("menuItemUpdated", (item) => io.emit("menuItemUpdated", item)); // Menu item updated
  //socket.on("itemAddedToCart", (cartItem) => io.emit("itemAddedToCart", cartItem)); // Item added to cart
  //socket.on("itemRemovedFromCart", (cartItemId) => io.emit("itemRemovedFromCart", cartItemId)); // Item removed from cart
  socket.on("orderPlaced", (order) => io.emit("orderPlaced", order)); // Order placed
  socket.on("orderStatusUpdated", (order) => io.emit("orderStatusUpdated", order)); // Order status updated (e.g., ready, delivered)
  socket.on("cancelOrder", (order) => io.emit("cancelOrder", order)); // Order placed


  // Assign the user to a room based on their user ID (for targeted notifications)
  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
  });

  // Handle real-time new comment notification
  socket.on("newComment", (data) => {
    io.to(`user_${data.postOwnerId}`).emit("newNotification", {
      title: "New Comment on Your Post",
      body: `${data.commenterName} commented: "${data.comment}"`,
    });
  });

});


// Middleware
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 Create Order API (Allows User to Input Amount)
app.post("/api/payment/create-order", async (req, res) => {
  let { amount, currency } = req.body;
  console.log(amount);
  try {
      // 🔹 Validate Amount
      if (!amount || isNaN(amount) || amount <= 0) {
          return res.status(400).json({ success: false, message: "Invalid amount entered!" });
      }

      const options = {
          amount: amount * 100, // Convert ₹ to paise
          currency: currency || "INR",
          receipt: "order_rcptid_" + Math.random().toString(36).substr(2, 9),
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
  } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
  }
});

// 🔹 Verify Payment API
app.post("/api/payment/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

  if (generatedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully!" });
  } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
  }
});



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/homepage", homeRoutes);
app.use("/api/counselling", counsellingRoutes);
app.use("/api/report", counsellingReportRoutes);
app.use("/api/canteen", canteenRoutes);


// Start server after DB connection
sequelize.authenticate()
  .then(() => {
    console.log("Connected to MySQL");
    server.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("Database connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = { io };
