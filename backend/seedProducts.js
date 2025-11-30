// seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample products data (20+ items) - Matching your model exactly
const products = [
  // Men's Category
  {
    name: 'Classic White Crew Neck T-Shirt',
    description: 'Premium cotton crew neck t-shirt. Perfect for everyday wear.',
    price: '599',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50
  },
  {
    name: 'Black V-Neck T-Shirt',
    description: 'Stylish black v-neck tee made from soft breathable fabric.',
    price: '649',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 35
  },
  {
    name: 'Navy Blue Graphic T-Shirt',
    description: 'Modern graphic print t-shirt for a casual look.',
    price: '799',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 42
  },
  {
    name: 'Formal White Dress Shirt',
    description: 'Classic white dress shirt perfect for office and formal occasions.',
    price: '1299',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 28
  },
  {
    name: 'Casual Denim Shirt',
    description: 'Comfortable denim shirt for a relaxed weekend look.',
    price: '1499',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30
  },
  {
    name: 'Checked Flannel Shirt',
    description: 'Warm flannel shirt with classic check pattern.',
    price: '1699',
    image: 'https://images.unsplash.com/photo-1598032895397-b9cdde1322a7?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 25
  },
  {
    name: 'Slim Fit Blue Jeans',
    description: 'Modern slim fit jeans in classic blue wash.',
    price: '1999',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45
  },
  {
    name: 'Black Skinny Jeans',
    description: 'Trendy black skinny jeans with stretch comfort.',
    price: '2199',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 38
  },
  {
    name: 'Leather Biker Jacket',
    description: 'Premium leather jacket with modern fit.',
    price: '4999',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 15
  },
  {
    name: 'Denim Jacket',
    description: 'Classic blue denim jacket for all seasons.',
    price: '2499',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22
  },

  // Women's Category
  {
    name: 'Floral Print Blouse',
    description: 'Elegant floral print blouse for formal occasions.',
    price: '1199',
    image: 'https://images.unsplash.com/photo-1564257577154-75f3c84a8f68?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    stock: 32
  },
  {
    name: 'White Cotton Blouse',
    description: 'Classic white cotton blouse with button details.',
    price: '899',
    image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40
  },
  {
    name: 'Silk Camisole Top',
    description: 'Luxurious silk camisole in elegant design.',
    price: '1599',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    stock: 28
  },
  {
    name: 'Summer Floral Dress',
    description: 'Light and breezy floral dress perfect for summer.',
    price: '2299',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25
  },
  {
    name: 'Little Black Dress',
    description: 'Timeless black dress for any occasion.',
    price: '2799',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    stock: 30
  },
  {
    name: 'Maxi Evening Dress',
    description: 'Elegant maxi dress for evening events.',
    price: '3499',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    stock: 18
  },
  {
    name: 'High Waist Mom Jeans',
    description: 'Trendy high waist mom jeans in light wash.',
    price: '1899',
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35
  },
  {
    name: 'Skinny Fit Blue Jeans',
    description: 'Perfect skinny fit jeans with stretch.',
    price: '1799',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40
  },
  {
    name: 'Casual Hoodie',
    description: 'Comfortable cotton hoodie for everyday wear.',
    price: '1299',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45
  },
  {
    name: 'Striped T-Shirt',
    description: 'Classic striped t-shirt in navy and white.',
    price: '699',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50
  },

  // Kids Category
  {
    name: 'Kids Cotton T-Shirt Pack',
    description: 'Pack of 3 colorful cotton t-shirts for kids.',
    price: '999',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 50
  },
  {
    name: 'Kids Denim Jacket',
    description: 'Cute denim jacket for kids aged 5-12.',
    price: '1499',
    image: 'https://images.unsplash.com/photo-1503919436485-a9b97f1f3226?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 30
  },
  {
    name: 'Kids Cargo Shorts',
    description: 'Comfortable cargo shorts for active kids.',
    price: '799',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40
  },
  {
    name: 'Kids Graphic Sweatshirt',
    description: 'Fun graphic print sweatshirt for boys and girls.',
    price: '1199',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 35
  }
];

// Import data
const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    console.log(`📦 Imported ${products.length} products`);
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('✅ Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}