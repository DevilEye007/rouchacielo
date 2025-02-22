const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/ProductModel');


// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allow only JPEG and PNG files
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  },
});

// Create a product (Admin route) with image upload
router.post('/admin/products', upload.single('picture'), async (req, res) => {
  try {
    const { name, description, price, Discounted_price, category, ratings } = req.body;

    // Ensure Multer has stored the file
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      Discounted_price,
      category,
      ratings,
      picture: `/uploads/${req.file.filename}`, // Save the relative path to the database
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET /getAllProducts?category=Casual Wear

router.get('/getAllProducts', async (req, res) => {
  const { category } = req.query; // Extract the category from the query parameters

  try {
    // Build the query object
    const query = category ? { category } : {};

    // Fetch products based on the query
    const products = await Product.find(query);

    // Respond with the products
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});


// Update a product (Admin route)
router.put('/admin/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product (Admin route)
router.delete('/admin/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Product = require('../models/ProductModel');
// const fs = require('fs');

// // Middleware to log requests
// router.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next(); 
// });

// // Create product route
// router.post('/admin/products', async (req, res) => {
//   const logFile = './logs/errors.log'; // Log file path

//   try {
//     console.log(`[INFO] Incoming Request Data: ${JSON.stringify(req.body)}`);

//     const newProduct = new Product(req.body);
//     await newProduct.save();

//     console.log(`[SUCCESS] Product saved successfully: ${JSON.stringify(newProduct)}`);
//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error(`[ERROR] Error saving product: ${err.message}`);
    
//     // Write error log to file
//     const errorLog = `[${new Date().toISOString()}] ERROR: ${err.message} - Stack: ${err.stack}\n`;
//     fs.appendFile(logFile, errorLog, (fileErr) => {
//       if (fileErr) {
//         console.error(`[ERROR] Failed to write to log file: ${fileErr.message}`);
//       }
//     });

//     res.status(400).json({ error: err.message });
//   } finally {
//     console.log(`[INFO] Request Processed`);
//   }
// });

// module.exports = router;
