const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/ProductModel');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Folder to store images
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

// Serve static files for the uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GET all products (with optional category filtering)
router.get('/getAllProducts', async (req, res) => {
  const { category } = req.query;
  try {
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// Get newest products (sorted by _id descending)
router.get('/newest', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching newest products:', err);
    res.status(500).json({ error: 'An error occurred while fetching newest products' });
  }
});

// Get oldest products (sorted by _id ascending)
router.get('/oldest', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching oldest products:', err);
    res.status(500).json({ error: 'An error occurred while fetching oldest products' });
  }
});


router.get('/price-high', async (req, res) => {
  try {
    const products = await Product.find().sort({ price: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products by price high to low:', err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

router.get('/price-low', async (req, res) => {
  try {
    const products = await Product.find().sort({ price: 1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products by price low to high:', err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// GET a specific product by ID (this route is now placed after the above routes)
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Validate the product ID format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
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
// const multer = require('multer');
// const path = require('path');
// const Product = require('../models/ProductModel');

// // Configure Multer for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/')); // Folder to store images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/; // Allow only JPEG and PNG files
//     const mimeType = fileTypes.test(file.mimetype);
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimeType && extName) {
//       return cb(null, true);
//     }
//     cb(new Error('Only images are allowed'));
//   },
// });


// // Serve static files for the uploads folder
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // GET all products (User route)
// router.get('/getAllProducts', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: 'An error occurred while fetching products' });
//   }
// });
// // GET a specific product by ID (User route)
// router.get('/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // Validate the product ID format
//     if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ error: 'Invalid product ID format' });
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.status(200).json(product);
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     res.status(500).json({ error: 'An error occurred while fetching the product' });
//   }
// });

// // Get all products with category filtering
// router.get('/getAllProducts', async (req, res) => {
//   const { category } = req.query;

//   try {
//     const query = category ? { category } : {};
//     const products = await Product.find(query);
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: 'An error occurred while fetching products' });
//   }
// });

// // Get newest products (sorted by createdAt descending)
// router.get('/products/newest', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching newest products:', err);
//     res.status(500).json({ error: 'An error occurred while fetching newest products' });
//   }
// });

// // Get oldest products (sorted by createdAt ascending)
// router.get('/products/oldest', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: 1 });
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching oldest products:', err);
//     res.status(500).json({ error: 'An error occurred while fetching oldest products' });
//   }
// });

// // Get products sorted by price high to low
// router.get('/products/price-high', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ price: -1 });
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching products by price high to low:', err);
//     res.status(500).json({ error: 'An error occurred while fetching products' });
//   }
// });

// // Get products sorted by price low to high
// router.get('/products/price-low', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ price: 1 });
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching products by price low to high:', err);
//     res.status(500).json({ error: 'An error occurred while fetching products' });
//   }
// });


// // Update a product (Admin route)
// router.put('/admin/products/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!updatedProduct)
//       return res.status(404).json({ error: 'Product not found' });
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete a product (Admin route)
// router.delete('/admin/products/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct)
//       return res.status(404).json({ error: 'Product not found' });
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;











// const express = require('express');
// const router = express.Router();
// const Product = require('../models/ProductModel');

// // GET all products (User route)
// router.get('/getAllProducts', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: 'An error occurred while fetching products' });
//   }
// });

// // GET a specific product by ID (User route)
// router.get('/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // Validate the product ID format
//     if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ error: 'Invalid product ID format' });
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.status(200).json(product);
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     res.status(500).json({ error: 'An error occurred while fetching the product' });
//   }
// });

// module.exports = router;




















