# 🍔 FoodGunj - MERN Stack Food Ordering App

FoodGunj is a **MERN (MongoDB, Express, React, Node.js)** based food ordering application that allows users to browse, add to cart, and order food items seamlessly. It features authentication, order history, and a fully functional backend with a MongoDB database.

---

## 🚀 Features
- User Authentication (JWT-based login & signup)
- Browse food items with categories
- Add to Cart and Place Orders
- Order History & User Dashboard
- Admin Panel for Managing Products & Orders
- Responsive UI using React

---

## 📸 Screenshots
### 🔹 Home Page
![Home Page](./screenshots/homepage.png)

### 🔹 Food Details Page
![Food Details](./screenshots/food_details.png)

### 🔹 Cart Page
![Cart Page](./screenshots/cart.png)

### 🔹 Order History
![Order History](./screenshots/order_history.png)

(Place your actual screenshots in a `screenshots` folder inside the project.)

---

## 🛠️ Tech Stack
### **Frontend:**
- React.js (with Hooks & Context API)
- Tailwind CSS / Material UI for styling
- Axios for API calls

### **Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer for Image Uploads

---

## 🎯 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/FoodGunj.git
cd FoodGunj
```

### **2️⃣ Backend Setup**
```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory and add:
```env
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
- Start the backend server:
```bash
npm run dev
```

### **3️⃣ Frontend Setup**
```bash
cd ../client
npm install
npm start
```

---

## 📌 API Endpoints
### 🔹 **User Authentication**
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login

### 🔹 **Food Management**
- `GET /api/foods` - Get all food items
- `POST /api/foods` - Add new food (Admin only)

### 🔹 **Cart & Orders**
- `POST /api/cart` - Add item to cart
- `POST /api/orders` - Place an order
- `GET /api/orders` - Get user orders

---

## 🏗️ Future Enhancements
- Payment Gateway Integration
- Real-time Order Tracking
- Review & Rating System

---


## 🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🔗 Contact
For any inquiries, reach out to **your-email@example.com** or visit the **GitHub Repository**: [FoodGunj](https://github.com/your-username/FoodGunj)

---

⭐ **Star this project if you like it!** ⭐

