import dotenv from 'dotenv';
import { connectDB } from './db.js';
import Product from './models/Product.js';
import Review from './models/Review.js';

dotenv.config();

const products = [
  {
    name: 'Aurora Bloom',
    brand: 'House of Aurora',
    shortDescription: 'Floral, airy, and effortlessly elegant.',
    description:
      'Aurora Bloom opens with airy peony and bergamot before drifting into a delicate heart of jasmine and rose. A soft musk base lingers.',
    price: 6499,  // INR
    mrp: 7999,
    rating: 4.6,
    labels: ['New'],
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/images/aurora_1.png', '/images/aurora_2.png', '/images/aurora_3.png']
  },
  {
    name: 'Midnight Ember',
    brand: 'Ember Atelier',
    shortDescription: 'Smoky amber wrapped in vanilla warmth.',
    description:
      'Resinous amber melts into smoked woods and Madagascar vanilla. Spices flicker like candlelight—mesmerizing for evenings.',
    price: 7499,
    mrp: 9200,
    rating: 4.8,
    labels: ['Best Seller','Sale'],
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/images/ember_1.png', '/images/ember_2.png', '/images/ember_3.png']
  },
  {
    name: 'Citrus Atlas',
    brand: 'Modern Classics',
    shortDescription: 'Zesty citrus with a crisp, modern edge.',
    description:
      'Brisk grapefruit, lime, and neroli sparkle atop a mineral heart—clean and contemporary.',
    price: 4999,
    mrp: 5999,
    rating: 4.2,
    labels: ['Sale'],
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/images/citrus_1.png', '/images/citrus_2.png', '/images/citrus_3.png']
  },
  {
    name: 'Velvet Fig',
    brand: 'Fig & Woods',
    shortDescription: 'Lush fig framed by soft woods.',
    description:
      'Creamy fig pulp and green leaves meet cashmere woods for a plush, cocooning effect.',
    price: 6999,
    mrp: 8500,
    rating: 4.5,
    labels: [],
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/images/fig_1.png', '/images/fig_2.png', '/images/fig_3.png']
  },
  {
    name: 'Marine Drift',
    brand: 'Blue Horizon',
    shortDescription: 'Airy marine breeze with sun-warmed skin.',
    description:
      'Salt-spray freshness sweeps through lotus and driftwood accords. A hint of coconut and skin musk evokes endless coastlines.',
    price: 5499,
    mrp: 6499,
    rating: 4.1,
    labels: ['New'],
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/images/marine_1.png', '/images/marine_2.png', '/images/marine_3.png']
  }
];

const sampleReviews = [
  { authorName: 'Ava', rating: 5, comment: 'Absolutely love this scent—fresh yet refined!' },
  { authorName: 'Ishaan', rating: 4, comment: 'Great longevity without overpowering.' },
  { authorName: 'Lina', rating: 5, comment: 'My new signature perfume.' }
];

async function seed() {
  const conn = await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/perfume_shop');
  try {
    await Product.deleteMany({});
    await Review.deleteMany({});
    const created = await Product.insertMany(products);

    // Attach a couple of reviews to the first 2 products
    for (let i = 0; i < 2; i++) {
      const prod = created[i];
      for (const r of sampleReviews) {
        await Review.create({ ...r, productId: prod._id });
      }
    }
    console.log('Seed complete ✅');
  } catch (err) {
    console.error(err);
  } finally {
    await conn.close();
    process.exit(0);
  }
}

seed();
