# 🍔 FoodGunj - MERN Stack Food Ordering App

FoodGunj is a **MERN (MongoDB, Express, React, Node.js)** based food ordering application that lets users explore and order their favorite dishes. Features include user authentication, favorites list, cart management, and order tracking.

## 🚀 Live Demo
- Frontend: [FoodGunj App](https://foodgunj.netlify.app/)

## 🎯 Key Features
- **User Authentication** (JWT-based)
- **Product Management**
  - Browse food items
  - Search functionality
  - Category filtering
- **Shopping Features**
  - Add to favorites
  - Cart management
  - Order placement
- **Responsive Design**
  - Mobile-first approach
  - Clean UI with Material UI

## 🛠️ Tech Stack
### Frontend
- React.js
- Material UI
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm/yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/pawan1-tech/FoodGunj-MERN.git
cd FoodGunj-MERN
```

2. **Backend Setup**
```bash
cd server
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# PORT=8000

npm start
```

3. **Frontend Setup**
```bash
cd client
npm install
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### User Operations
- `GET /api/user/favorite` - Get favorites
- `POST /api/user/favorite` - Add to favorites
- `GET /api/user/cart` - Get cart items
- `POST /api/user/cart` - Add to cart
- `POST /api/user/order` - Place order

## 👤 Author
**Pawan Sah**
- Email: sahpawan117@gmail.com
- GitHub: [@pawan1-tech](https://github.com/pawan1-tech)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## ⭐ Show your support
Give a ⭐️ if this project helped you!

## 📝 License
This project is [MIT](LICENSE) licensed.