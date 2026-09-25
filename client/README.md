# RoKaShree – Handmade Macrame Ecommerce

RoKaShree is a full-stack ecommerce website designed for a handmade macrame and home-decor business.

The platform provides a complete customer shopping experience along with a secure admin dashboard for managing products, orders, customer enquiries, and newsletter subscribers.

## 🌐 Live Demo

**Live Website:**  
https://ro-ka-shree-ecommerce.vercel.app/

---

## 📌 About the Project

RoKaShree was developed as a real-world ecommerce application with both customer-facing and administrative functionality.

The application includes:

- Customer authentication
- Product browsing
- Product details
- Wishlist
- Shopping cart
- Customer profile
- Saved delivery address
- Checkout
- Order placement
- Order history
- Contact enquiries
- Newsletter subscription
- Admin authentication
- Product management
- Order management
- Customer messages
- Newsletter management
- Firebase Firestore database
- Production deployment with Vercel

---

## ✨ Features

### 👤 Customer Features

- User registration and login
- Responsive homepage
- Product collection
- Product categories
- Product search and filtering
- Product details
- Wishlist
- Shopping cart
- Customer profile
- Saved delivery address
- Checkout
- Cash on Delivery
- Order placement
- My Orders
- Order details
- Contact form
- Newsletter subscription
- Responsive mobile experience

### 🛠️ Admin Features

- Secure admin authentication
- Admin dashboard
- Product management
- Add products
- Edit products
- Delete products
- Product image management
- Order management
- Order status management
- Order details
- Customer enquiry management
- Newsletter subscriber management

### 🔐 Security

- Firebase Authentication
- Firebase Firestore security rules
- Admin custom claims
- Customer-specific order access
- Admin-only product management
- Admin-only order updates
- Protected admin routes
- Firebase Admin credentials excluded from Git

---

## 🧑‍💻 Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- React Toastify

### Backend & Database

- Node.js
- Express.js
- Firebase
- Firebase Authentication
- Firebase Firestore
- Firebase Admin SDK

### Deployment & Version Control

- Git
- GitHub
- Vercel

---

## 📂 Project Structure

```text
RoKaShree-Ecommerce/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── serviceAccountKey.json   # Local only – not committed
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── firebase/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

Clone the repository and install the frontend dependencies:

```bash
git clone https://github.com/shreyasonawane9545/RoKaShree-Ecommerce.git
cd RoKaShree-Ecommerce/client
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🔑 Firebase Configuration

RoKaShree uses Firebase for:

- Firebase Authentication
- Cloud Firestore
- Application data management

The backend uses Firebase Admin SDK for administrative operations.

### 🔒 Security

Private credentials and secret keys must never be committed to GitHub.

The Firebase Admin service account file is kept locally and excluded from Git:

```text
backend/serviceAccountKey.json
```

Firestore security rules are used to control access to customer and administrative data.

---

## ☁️ Deployment

### Frontend

Deployed using **Vercel**

### Source Code

Hosted on **GitHub**

### Authentication & Database

Powered by **Firebase**

### Live Website

https://ro-ka-shree-ecommerce.vercel.app/

---

## 🧪 Project Status

### Production v1

RoKaShree is currently deployed as a production Version 1 ecommerce application.

| Feature | Status |
|---|---|
| Customer Website | ✅ |
| Authentication | ✅ |
| Products | ✅ |
| Wishlist | ✅ |
| Cart | ✅ |
| Checkout | ✅ |
| Orders | ✅ |
| Customer Profile | ✅ |
| Contact | ✅ |
| Newsletter | ✅ |
| Admin Dashboard | ✅ |
| Admin Products | ✅ |
| Admin Orders | ✅ |
| Admin Messages | ✅ |
| Admin Newsletter | ✅ |
| Firebase Security | ✅ |
| Responsive UI | ✅ |
| Production Deployment | ✅ |

---

## 👩‍💻 Author

### Shreya Sonawane

Computer Engineering Graduate

**GitHub:**  
https://github.com/shreyasonawane9545

---

## 📄 License

This project is a personal portfolio/business project.

All product images, branding, and original content are intended for RoKaShree and should not be reused without permission.