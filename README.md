# 🚗 UniRide – Campus Mobility Coordination System

UniRide is a **student-focused mobility coordination platform** designed for university environments.
It enables verified users to **offer, discover, and share rides within a controlled campus ecosystem**.

> ⚠️ This project is a **prototype / systems design implementation** and is not production-ready.

---

## 📌 Overview

UniRide models a **multi-role mobility system** with:

* 🎓 Campus-restricted access
* 🚘 Ride coordination (not commercial ride-hailing)
* 👥 Carpool optimization
* 🛡️ Safety-aware design
* 🌱 Sustainability incentives

The system focuses on **architecture, UI/UX, and system design principles**, rather than real-world deployment.

---

## 👥 User Roles

### 🚶 Rider

* Book rides (pickup → campus / campus → drop)
* Choose ride type (2W / 4W)
* Opt for carpooling (seat selection)
* Track ride history
* Earn rewards (CO₂ reduction → campus coins)

---

### 🏍️ Driver

* Go online/offline to accept requests
* Receive ride requests based on proximity
* Accept / decline rides
* Track weekly earnings
* Earn rewards based on performance

---

### 🛠️ Admin

* Verify driver applications
* Monitor active rides
* Track system metrics (CO₂, usage, commission)
* Manage safety and platform rules

---

## 🧩 Core Features

* 🔐 **Role-based authentication system**
* 🚘 **Ride booking and request system**
* 👥 **Carpool seat allocation**
* 🛡️ **Preference-based safety matching**
* 📊 **Admin monitoring dashboard**
* 🌱 **Sustainability reward system (Campus Coins)**

---

## 🧱 System Architecture

Frontend:

* Next.js (App Router)
* React
* Tailwind CSS

Backend:

* API routes / Server Actions
* Authentication layer (JWT / Auth.js)

Database:

* Prisma ORM
* Relational schema (User, Ride, Driver, Verification)

---

## ⚙️ Key Design Concepts

* **Controlled Ecosystem**
  Only university users can access the system

* **Role-Based Access Control**
  Strict separation between Rider, Driver, Admin

* **Mobility Coordination (Not Ride-Hailing)**
  Focus on shared commuting, not commercial transport

* **Safety by Design**
  Verification + preference-based matching

* **Sustainability Integration**
  Incentives tied to reduced emissions

---

## 📊 Current Status

✅ UI/UX implemented
✅ Role-based dashboards
⚠️ Authentication (basic / improving)
⚠️ Backend integration (in progress)
⚠️ Uses partial mock data

---

## 🚧 Known Limitations

* No real payment integration
* No legal/insurance framework
* Driver verification is simplified
* Real-time tracking is not fully implemented
* Not suitable for real-world deployment

---

## 🛣️ Future Improvements

* 🔄 Full backend integration
* 🗺️ Real-time map tracking
* 💳 Payment gateway support
* 🤖 Smart ride matching (AI-based)
* 🚨 Advanced safety features (SOS, monitoring)

---

## 📷 Screens / Modules

* Landing Page (Role Selection)
* Rider Dashboard
* Driver Dashboard
* Admin Panel

---

## 🧠 Learning Outcomes

This project demonstrates:

* Designing **multi-role systems**
* Transitioning from **UI prototype → data-driven architecture**
* Understanding **real-world constraints (safety, access, verification)**
* Structuring a **mobility use case in a constrained environment**

---

## 📜 License

This project is for **academic and demonstration purposes only**.

---

## 🤝 Disclaimer

UniRide is a **conceptual system design project**.
It does not provide real transportation services and should not be used in a live environment without:

* legal validation
* insurance frameworks
* compliance with regulations

---

## 👨‍💻 Authors

* Your Name(s)
* University / Department

---

> If you're reading this as a recruiter: yes, the legal issues are known.
> The point here is **system design, not pretending to be Uber.**

