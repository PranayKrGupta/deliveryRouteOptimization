# 🚚 RouteFlow — Logistics Delivery & Route Optimization

RouteFlow is a high-performance, interactive graph-based application designed to optimize delivery routes for modern e-commerce logistics. It transforms complex city networks into a sleek, animated experience where shortest paths are calculated using a **Hybrid High-Performance Engine**.

---

## ✨ Key Features

- **🌐 Interactive City Logistics Network:** Powered by **Cytoscape.js**, featuring a dynamic graph of warehouses, junctions, and customer destinations.
- **⚡ Hybrid Routing Engine:** Seamlessly integrates **Python (Flask)** with a **C++ (Dijkstra)** performance core for ultra-fast pathfinding.
- **🤖 Intelligent Routing Strategies:**
  - **Sequential Delivery:** Process orders in the exact sequence they are added to the queue.
  - **Optimized Delivery:** Implements the **Nearest Neighbor Heuristic** to minimize total travel distance in real-time.
- **🛠️ Dynamic Map Editor:** Build and modify your logistics network on the fly by adding nodes (Customers/Junctions) and connecting them with custom weights.
- **🎨 Glassmorphism Design System:** 
  - **Responsive UI** with a modular CSS architecture for maximum performance.
  - **Theme Support:** Includes **Light Glass**, **Dark Glass**, **Solarized Dark**, and **Solarized Light** modes.
- **📊 Live Analytics Dashboard:** Real-time calculation of **Total Distance (km)** and **Estimated Time of Arrival (ETA)** with animated vehicle transit pathing.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, Modular CSS, Vanilla JavaScript (ES6 Modules) |
| **Visualization** | Cytoscape.js |
| **Backend** | Python 3.x (Flask) |
| **Performance Core** | C++ (Dijkstra's Algorithm) |
| **Static Assets** | WhiteNoise |

---

## ⚙️ System Architecture

RouteFlow is designed with a decoupled architecture to ensure scalability and high performance.

1. **Modular Frontend:** UI logic is encapsulated in specialized ES modules (`graph.js`, `routing.js`, `editor.js`) for clean state management.
2. **Hybrid Solver:** The Flask backend communicates with a compiled C++ binary to perform Dijkstra calculations, ensuring minimal latency for complex graphs.

---

## 🏃 Local Setup Guide

### 1. Prerequisites
- **Python 3.8+**
- **C++ Compiler** (GCC/G++ or MinGW)
- **Git**

### 2. Clone and Install
```bash
git clone https://github.com/PranayKrGupta/deliveryRouteOptimization.git
cd DeliveryRouteOptimization
```

### 3. Virtual Environment
```powershell
# Create venv
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 4. Compile Performance Core (C++)
The hybrid engine requires the C++ module to be compiled for your specific OS.
```powershell
# Windows
g++ logic.cpp -o logic.exe

# Linux/Mac
g++ logic.cpp -o logic
chmod +x logic
```

### 5. Start Server
```bash
python app.py
```
Visit `http://localhost:10000` to start optimizing routes.

---

## 🌟 Project Rationale
RouteFlow bridges the gap between Graph Theory and real-world logistics. By allowing users to visualize and manipulate network topology, it demonstrates the tangible impact of algorithmic optimization on supply chain efficiency.

---
Developed with ❤️ by [Pranay Kumar Gupta](https://github.com/PranayKrGupta)
