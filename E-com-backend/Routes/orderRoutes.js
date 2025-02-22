// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");

// POST /api/orders - Create a new order
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalPrice,
      products,
    } = req.body;

    // Create a new order document using the received data
    const newOrder = new Order({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalPrice,
      products,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
 
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("products.productId") // Assuming each product in the order references the "Product" model
        .sort({ createdAt: -1 });
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
// POST /api/orders/:id/delete - Delete an order (mark as completed)
router.post("/:id/delete", async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
