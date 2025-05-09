# 💸 FinStack — Personal Finance Tracker (Microservices Architecture)

> Track your *Earnings 💰*, *Expenses 💸*, and *Insights 📊* like a boss.  
> Powered by **React + Node.js + Python + MongoDB**, deployed via **Vercel + Render**, running microservices with **Docker** and **RabbitMQ**.

---

## 🧩 Why Microservices?

This isn’t your typical fullstack toy app.

Each core domain (auth, earnings, expenses, analytics, ML/image labeling) runs as an **independent service**. Here's why:

- 🔧 Independent deployment & scaling
- 🔁 Fault isolation (1 crash ≠ total crash)
- 🔒 Domain separation (Auth stays Auth)
- 🧠 Easy integration with AI (Python + ML)

---

## 🏗️ Architecture Overview

```plaintext
+-------------+        +----------------+        +-----------------+
|  React App  | <----> |  Auth Service  | <----> |  MongoDB Atlas  |
| (Vite+RTK)  |        |  (Node + JWT)  |        |   (Shared DB)   |
+------+------+        +-------+--------+        +-----------------+
       |                        |
       |                        |
       v                        v
+---------------+       +------------------+
| Earnings API  | <---> |  Expense Service |
| (Node.js)     |       |  (Node.js)       |
+---------------+       +------------------+
       |
       v
+---------------------+
| Analytics / Charts  |
| (Node.js + Chart.js)|
+---------------------+
       |
       v
+---------------------+
| Flask Service       |
| (Python, AI Labeling|
|   or Notifications) |
+---------------------+


| Layer            | Tech                                        |
| ---------------- | ------------------------------------------- |
| Frontend         | React + Vite + Redux Toolkit                |
| API Gateway      | Node.js (optional)                          |
| Auth             | Node.js + JWT                               |
| Earnings/Expense | Node.js + Express + MongoDB                 |
| Image Labeling   | Python + Flask                              |
| Messaging Bus    | RabbitMQ (via Docker)                       |
| Database         | MongoDB Atlas (Cloud DB)                    |
| Deployment       | Vercel (frontend), Render/Docker (services) |

# 1. Start MongoDB locally or use an Atlas URI
# 2. Start RabbitMQ (local or Docker)
# 3. Start each service manually:

# Auth
cd auth-service && npm i && npm start

# Earnings
cd earnings-service && npm i && npm start

# Expense
cd expense-service && npm i && npm start

# Analytics
cd analytics-service && npm i && npm start

# Flask
cd flask-service && pip install -r requirements.txt && python app.py

# Frontend
cd frontend && npm i && npm run dev

# Step 1: Fork the repo on GitHub
# Step 2: Clone it
git clone https://github.com/<your-username>/finstack-microservices.git

# Step 3: Setup environment variables (copy `.env.example` → `.env`)
cp .env.example .env

# Step 4: Install deps and start services (use Docker or manually)
# Step 5: Enjoy building your finance empire 💸



---

Let me know if you want a more version, GitHub Actions CI config, or a badge-packed version for public showcasing.

