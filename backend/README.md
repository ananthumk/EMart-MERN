# Clothing E-Commerce Backend

A complete, production-ready backend for an e-commerce clothing store built with Node.js, Express, and MongoDB.

## Features

✅ User Authentication (JWT + HTTP-only cookies)  
✅ Product Management with Advanced Filters  
✅ Shopping Cart (Guest + Logged-in users)  
✅ Order Management  
✅ Email Notifications (Nodemailer)  
✅ Search & Pagination  
✅ Role-based Access Control  
✅ Secure Password Hashing  
✅ Error Handling Middleware  

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Email**: Nodemailer
- **Security**: HTTP-only cookies, CORS

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product operations
│   ├── cartController.js     # Cart management
│   └── orderController.js    # Order processing
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── errorHandler.js       # Global error handling
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── cartRoutes.js        # Cart endpoints
│   └── orderRoutes.js       # Order endpoints
├── utils/
│   └── sendEmail.js         # Email utility
├── seedProducts.js          # Database seeder
├── app.js                   # Entry point
├── .env.example             # Environment template
└── package.json             # Dependencies
```

## Installation & Setup

### 1. Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email notifications)

### 2. Clone & Install

```bash
# Create backend folder
mkdir backend && cd backend

# Initialize and install dependencies
npm install express mongoose bcryptjs jsonwebtoken cookie-parser cors dotenv nodemailer
npm install --save-dev nodemon
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

MONGO_URI=mongodb://localhost:27017/clothing-ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

**Important**: For Gmail, generate an App Password:
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App Passwords → Generate new password
4. Use the 16-character password in `.env`

### 4. Seed Database

Run the seeder to populate products:

```bash
npm run seed
```

To clear all products:

```bash
npm run seed:destroy
```

### 5. Start Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run at `http://localhost:4000`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |

### Product Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products (with filters) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| GET | `/api/products/categories/list` | Get all categories | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

**Product Filter Query Examples:**

```
GET /api/products?category=Men&size=L&minPrice=500&maxPrice=2000&page=1&limit=12
GET /api/products?search=denim&sort=-price
```

### Cart Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user's cart | Private |
| POST | `/api/cart/add` | Add item to cart | Private |
| PUT | `/api/cart/update` | Update cart item | Private |
| DELETE | `/api/cart/remove` | Remove cart item | Private |
| DELETE | `/api/cart/clear` | Clear entire cart | Private |
| POST | `/api/cart/sync` | Sync guest cart on login | Private |

### Order Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create new order | Private |
| GET | `/api/orders` | Get user's orders | Private |
| GET | `/api/orders/:id` | Get single order | Private |
| GET | `/api/orders/admin/all` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

## Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token_here"
  }
}
```

### Add to Cart

**Request:**
```json
POST /api/cart/add
{
  "productId": "product_id",
  "size": "L",
  "quantity": 2
}
```

### Create Order

**Request:**
```json
POST /api/orders
{
  "items": [
    {
      "product": "product_id",
      "size": "L",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Mumbai",
    "postalCode": "400001",
    "country": "India",
    "phone": "+91-9876543210"
  }
}
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **CORS**: Configured for frontend communication
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Centralized error middleware

## Testing with Postman

1. Import the endpoints into Postman
2. Set base URL: `http://localhost:4000`
3. For protected routes, include the JWT token:
   - In cookies: `jwt=your_token`
   - Or in headers: `Authorization: Bearer your_token`

## Common Issues & Solutions

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify MONGO_URI in `.env`
- For Atlas, whitelist your IP address

**Email Not Sending:**
- Verify Gmail App Password (not regular password)
- Enable "Less secure app access" if using old method
- Check EMAIL_USER and EMAIL_PASS in `.env`

**JWT Token Issues:**
- Clear browser cookies
- Check JWT_SECRET is set in `.env`
- Verify token expiry (default: 30 days)

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET (32+ characters)
3. Enable HTTPS for secure cookies
4. Use MongoDB Atlas for database
5. Use environment-specific email service (SendGrid, etc.)
6. Add rate limiting and helmet.js for security

## License

MIT

## Support

For issues or questions, please contact [your-email@example.com]

---

**Happy Coding! 🚀**