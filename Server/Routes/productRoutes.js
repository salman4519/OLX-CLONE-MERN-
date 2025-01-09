const express = require('express');
const router = express.Router();
const multer = require('../config/multer'); // Multer configuration
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

// Route to add a product (requires authentication)
router.post('/products', authController.verifyToken, multer.single('image'), productController.addProduct);

// Route to get all products for the logged-in user (requires authentication)
router.get('/my-products', authController.verifyToken, productController.getProducts);

// Route to get the list of all products (public access, no auth required)
router.get('/products/list', productController.listProducts);

// Route to update a product (requires authentication)
router.put('/products/:productId', authController.verifyToken, multer.single('image'), productController.updateProduct);

// Route to delete a product (requires authentication)
router.delete('/products/:productId', authController.verifyToken, productController.deleteProduct);

module.exports = router;
