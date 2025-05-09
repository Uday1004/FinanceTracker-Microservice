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
