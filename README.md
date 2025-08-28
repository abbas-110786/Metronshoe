# METRONSHOE - Footwear E-commerce Website

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for a footwear e-commerce website with red, white, and blue theme.

## Features

- **User Authentication**: Login and Register functionality
- **Product Categories**: Sandals, Chappals, and Shoes
- **Shopping Cart**: Add to cart, remove items, view total
- **Responsive Design**: Mobile-friendly interface
- **Category Filtering**: Filter products by category
- **Modern UI**: Red, white, and blue color scheme

## Technology Stack

- **Frontend**: React with TypeScript, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with responsive design

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/metronshoe
JWT_SECRET=metronshoe_secret_key_2024
PORT=5000
```

3. Start the backend server:
```bash
npm run server
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

### Full Application

To run both frontend and backend simultaneously:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=sandal` - Get products by category
- `POST /api/products/seed` - Seed sample products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item from cart

## Project Structure

```
metronshoe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main App component
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json           # Backend dependencies
```

## Usage

1. **Register/Login**: Create an account or login to existing account
2. **Browse Products**: View all products or filter by category (Sandals, Chappals, Shoes)
3. **Add to Cart**: Click "Add to Cart" on any product (requires login)
4. **Manage Cart**: View cart, remove items, see total price
5. **Categories**: Navigate through different footwear categories

## Default Products

The application includes sample products:
- **Sandals**: Classic Sandal, Beach Sandal
- **Chappals**: Leather Chappal, Casual Chappal  
- **Shoes**: Sports Shoes, Formal Shoes

## Color Theme

- **Primary Red**: #dc2626
- **Primary Blue**: #2563eb
- **White**: #ffffff
- **Light Gray**: #f8fafc
- **Dark Gray**: #374151

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.