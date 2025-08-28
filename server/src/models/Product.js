import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: '' },        // NEW
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },     // our sell price
  mrp: { type: Number },                       // NEW: compare-at price (to show "Save ₹")
  sizes: [{ type: String }],
  images: [{ type: String }],
  labels: [{ type: String, default: [] }],     // NEW: e.g., ["Sale","New"]
  rating: { type: Number, min: 0, max: 5 },    // NEW: to sort "Best Sellers"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema);
