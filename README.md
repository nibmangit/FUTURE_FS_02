# 🚀 MiniTech — Full Stack E-Commerce Platform

A complete full-stack e-commerce application built with **React (frontend)** and **Django REST Framework (backend)**.  
The project features authentication, product management, cart system, order processing, and real payment integration using **Chapa**.

---

## 🌐 Live Demo
🔗 https://future-fs-02-black.vercel.app/

---

# 🧠 Overview

MiniTech is a modern tech e-commerce platform where users can:

- Browse products
- Search and filter by category 
- Add products to cart
- Checkout with shipping details
- Pay using Chapa payment gateway
- View order history

The system is fully API-driven and simulates a real-world e-commerce architecture.

---

# ⚙️ Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Context API
- Custom Hooks (useProducts, useAuth, useCart, useDebounce)

## Backend
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- PostgreSQL / SQLite (development)

## Payment
- Chapa Payment Gateway
- Webhook-based payment confirmation

---

# 🔐 Authentication System

- User registration & login
- JWT authentication (access + refresh tokens)
- Protected API routes 

### Features:
- Secure token-based authentication
- Persistent login sessions
- Extendable user system

---

# 🛒 E-Commerce Features

## 📦 Products
- Product listing API
- Category filtering (slug-based)
- Full-text search 
- Server-side pagination

---

## 🧺 Cart System
- Add to cart
- Update quantity (increment / decrement / set)
- Remove items
- Real-time cart updates

### Cart Response Includes:
- Total items
- Total quantity
- Total price
- Full product details

---

## 🔄 Checkout Flow

1. Add items to cart  
2. Enter shipping address  
3. Create order  
4. Stock updated automatically  
5. Cart cleared after checkout  
6. Order created with status `pending`

---

## 📜 Order System

- Order history per user
- Order details include:
  - Products snapshot (frozen price)
  - Quantity
  - Subtotal
  - Total price
  - Status (pending / paid / failed)
  - Timestamp

---

# 💳 Payment Integration (Chapa)

## Payment Flow

1. User creates order
2. Backend initializes Chapa payment
3. Returns checkout URL
4. User completes payment on Chapa
5. Chapa sends webhook to backend
6. Backend updates order status

---

## 🔔 Webhook Endpoint

Handles:
- Payment success
- Payment failure
- Order status updates

---

# 🎨 Frontend Features

- Fully responsive UI
- Dark mode design
- Modern e-commerce layout

## UX Features:
- Debounced search (optimized API calls)
- Category filtering (slug-based) 
- Pagination (Next / Prev with count awareness)

---

# 🧠 Custom Hooks

- `useProducts` → product fetching + filters + pagination
- `useCategories` → category fetching
- `useDebounce` → optimized search input
- `useAuth` → authentication state
- `useCartContext` → cart management

---

# 🔄 System Architecture

The application follows a modern decoupled architecture, ensuring a smooth flow from the user interface to secure payment processing. 

### 🚀 Data Flow

```mermaid
graph TD
    A[React Frontend]
    B[Custom Hooks / State Management]
    C[REST API Requests]
    D[Django Backend / DRF]
    E[(Database / Users & Orders)]
    F[Chapa Payment Gateway]
    G[Order Status Updated]

    A --> B
    B --> C
    C --> D
    D --> E
    D <--> F
    F -- Webhook --> D
    D --> G


---

# 🚀 Key Features

✔ JWT Authentication system  
✔ Product search, filter, and sorting  
✔ Server-side pagination  
✔ Cart management system  
✔ Order processing pipeline  
✔ Shipping address system  
✔ Real payment integration (Chapa)  
✔ Webhook-based payment confirmation  
✔ Fully responsive UI  
✔ Modular React architecture  

---

# 📦 API Features

## Users
- Register / Login / Refresh / Get user

## Store
- Products (filter, search, pagination)
- Categories
- Cart operations

## Orders
- Checkout
- Order history
- Address management

## Payments
- Initialize payment
- Webhook confirmation

---

# 🧠 What I Learned

- Full-stack API design
- JWT authentication flow
- Cart & order system architecture
- Payment gateway integration (Chapa)
- Frontend state management with hooks
- Scalable React + Django structure

---

# 📌 Future Improvements

- Admin dashboard
- Product reviews & ratings
- Wishlist system
- Email notifications
- Docker deployment
- Performance caching (Redis)

---

# 👨‍💻 Author

**Nibretu Mengaw**  
Full Stack Developer (React + Django)

---

# ⭐ Support

If you like this project:
- ⭐ Star the repo
- 🍴 Fork it
- 📢 Share feedback
