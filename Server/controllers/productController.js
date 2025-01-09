const { default: mongoose } = require('mongoose');
const Product = require('../models/productModel');
const fileService = require('../services/fileService');

// Add Product
const addProduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded. Please upload an image for the product.' });
  }

  try {
    const { productName, description, price } = req.body;
    const { userId } = req.user; // Get userId from the verified token

    // Input validation
    if (!productName || !description || !price) {
      return res.status(400).json({ message: 'All fields (productName, description, price) are required.' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number.' });
    }

    // Save file and generate image URL
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`; // Image URL using the static path

    // Save product to database with the userId
    const product = new Product({ productName, description, price, imageUrl, userId });
    await product.save();

    res.status(200).json({ message: 'Product added successfully.', product });
  } catch (error) {
    console.error('Error uploading product:', error);

    // Cleanup uploaded file if an error occurs
    if (req.file) {
      try {
        await fileService.deleteFile(req.file.filename); // use await for cleanup
      } catch (cleanupError) {
        console.error('Error deleting file after failure:', cleanupError);
      }
    }

    res.status(500).json({ message: 'An error occurred while adding the product. Please try again later.', error: error.message });
  }
};

// Get products for the logged-in user
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.userId }).populate('userId');
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user.' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'An error occurred while fetching the products. Please try again later.', error: error.message });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'An error occurred while fetching the products. Please try again later.', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { productName, description, price } = req.body;

  // Input validation
  if (!productName || !description || !price) {
    return res.status(400).json({ message: 'All fields (productName, description, price) are required.' });
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: 'Price must be a valid positive number.' });
  }

  try {
    // Find the product by ID and update it, ensuring the product belongs to the logged-in user
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, userId: req.user.userId }, // Only allow editing if the product belongs to the logged-in user
      { productName, description, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or you do not have permission to edit it.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'An error occurred while updating the product. Please try again later.', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;  
    console.log(productId)
    try {
      // Find the product and ensure it belongs to the logged-in user
      const deletedProduct = await Product.findOneAndDelete({ _id:new mongoose.Types.ObjectId(productId),userId:new mongoose.Types.ObjectId(req.user.userId)});
      console.log(deletedProduct)
      if (!deletedProduct) {
        // If product is not found or user does not own the product
        return res.status(404).json({ message: 'Product not found or you do not have permission to delete it.' });
      }
  
      // Optionally, delete the image file if you store images locally
      // const filename = deletedProduct.imageUrl.split('/').pop();  // Extract filename from image URL
      // await fileService.deleteFile(filename);  // Delete the file using your file service
  
      res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'An error occurred while deleting the product. Please try again later.', error: error.message });
    }
  };
  
module.exports = {
  addProduct,
  getProducts,
  listProducts,
  updateProduct,  
  deleteProduct   
};
