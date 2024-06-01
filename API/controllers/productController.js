const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  const newQ = req.query.new;
  const categoryQ = req.query.category;
  try {
    let products;
    if (newQ) {
      products = await Product.find().sort({ createdAt: -1 }).limit(6);
    } else if (categoryQ) {
      products = await Product.find({
        categories: { $in: [categoryQ] },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

