Sure Kritheebhan! Here's the **full `README.md` content** you can copy and paste into your project:

---

```markdown
# ⚡ ELCB Monitoring System

A smart **Electrical Leakage Circuit Breaker (ELCB)** monitoring web application built with **ReactJS** and **Firebase Realtime Database**. This system helps track electrical parameters and detect common power issues like voltage drop, overload, and short circuit in real-time.

---

## 🚀 Features

- 🔍 **Real-time Monitoring** of voltage, current, power, frequency, and more
- ⚠️ **Intelligent Fault Detection** (No Power, Overload, Short Circuit, Voltage Drop)
- 📊 **Dynamic UI Cards** for each sensor device
- 🔄 **Live Data Sync** with Firebase
- 🔎 **Smart Filters** by Department, Floor, Device Type, and Device ID
- 💡 Clear alert messages for fast decision-making
- 📱 Fully Responsive Layout (desktop + mobile)

---

## 🛠️ Tech Stack

- **ReactJS** – Frontend Framework
- **Firebase Realtime Database** – Backend for live sensor data
- **TailwindCSS** – For sleek UI and styling
- **ESLint** – Code quality
- **GitHub** – Version Control and Hosting

---

## 📂 Folder Structure

```
/src
  ├── Components/
  │   └── Images/
  │       └── sensor_icon.png
  ├── Pages/
  │   └── Sensor.jsx
  ├── App.js
  ├── firebaseConfig.js
  ├── index.js
  └── ...
```

---

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/kritheebhan/ELCB.git
   cd ELCB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Go to Project Settings → Add Web App → Copy the config
   - Replace values in `firebaseConfig.js`:
     ```js
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DB_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_BUCKET",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

4. **Run the development server**
   ```bash
   npm start
   ```

---

## 🔍 Filter ID Logic

Device ID Format: `IT01F002`

| Code     | Description         |
|----------|---------------------|
| **IT**   | Department (e.g., IT) |
| **01**   | Floor Number        |
| **F**    | Device Type (F - Fan, L - Light, etc.) |
| **002**  | Device Number       |

You can filter sensors using department, floor, and device type.

---

## 📸 Screenshots

| Real-time Monitoring | Fault Detection |
|----------------------|------------------|---------|
| ![Monitor](![Screenshot 2025-04-21 233615](https://github.com/user-attachments/assets/95af3951-fb6a-4065-a87f-d3b1c5ce9bd9)
) | ![Alert](![Screenshot 2025-04-16 213050](https://github.com/user-attachments/assets/604d5a69-abe8-48b6-a191-a5de3915dfa2)
) 

> Screenshots folder must be created manually in `/public` or `/src/assets`.

---

## ✅ Future Enhancements

- 📧 Email & SMS alert system for major faults
- 📈 Graph-based historical logs using Chart.js or Recharts
- 💾 Export fault data as CSV or PDF
- 🛠️ Admin Login and secure role-based access

---

## 👨‍💻 Developed By

**Kritheebhan**  
📧 [kritheebhan@email.com](mailto:kritheebhan@email.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/kritheebhan)  
💻 Passionate in Embedded Systems, ReactJS & Cybersecurity

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, share, and improve it!

```

---

Let me know if you want me to generate badges (build status, license, Firebase, React version) or help you write a GitHub description too.
