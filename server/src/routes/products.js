import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

const router = express.Router();

// GET /api/products - list products (homepage)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - product detail (+ reviews)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const reviews = await Review.find({ productId: product._id }).sort({ createdAt: -1 }).lean();
    res.json({ product, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products/:id/reviews - add a review
router.post('/:id/reviews', async (req, res) => {
  try {
    const { authorName, rating, comment } = req.body;
    if (!authorName || !rating || !comment) {
      return res.status(400).json({ error: 'authorName, rating and comment are required' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const review = await Review.create({
      productId: product._id,
      authorName,
      rating: Number(rating),
      comment
    });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

export default router;
