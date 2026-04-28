# RouteFlow — Logistics Delivery & Route Optimization System

RouteFlow is a high-performance, interactive graph-based application designed to optimize delivery routes for modern e-commerce logistics. It transforms a city network into an animated experience where shortest paths are calculated using **Dijkstra’s Algorithm** and **Nearest Neighbor** heuristics. 

The system visualizes a weighted network of a Main Warehouse, Junctions, and Customer Destinations in the browser. Users can watch the delivery vehicle move across the map in real-time as it processes a delivery queue.

---

## 🚀 Key Features
- **Interactive Network Graph:** Powered by **Cytoscape.js**, featuring a Main Warehouse (W1), Customers (C1–C6), and routing Junctions (J1–J8).
- **Dynamic Delivery Queue:** Add multiple customers to a delivery run with specific product descriptions.
- **Animated Path Rendering:** Nodes pulse upon arrival and edges highlight during transit to visualize the delivery flow.
- **Real-time Analytics:** Instant calculation of **Total Travel Distance** and **Estimated Time of Arrival (ETA)**.
- **Hybrid Backend:** Built with **Python (Flask)** for the web server, featuring an optional **C++ module** for high-speed offline path calculations.

---

## 🔀 Two Routing Strategies
RouteFlow offers two distinct logistics modes via a frontend toggle:

1. **Sequential Delivery Mode (Default)**  
   The system visits customers in the exact order they were added to the queue.  
   *Path sequence: Warehouse → Customer A → Customer B → Customer C...*

2. **Optimized Delivery Mode (Nearest Neighbor)**  
   An intelligent routing strategy that re-calculates the queue at every step. The system always travels to the **closest unvisited customer** from its current location to minimize total travel distance.

---

## 🛠️ Technology Stack
- **Frontend:** HTML5, Vanilla CSS (Glassmorphism), JavaScript, Cytoscape.js (Graph Visualization).
- **Backend:** Python (Flask), `heapq` for Priority Queue implementation.
- **Algorithms:** Dijkstra's Shortest Path, Nearest Neighbor Heuristic.
- **Performance:** C++ Dijkstra implementation for offline/standalone execution.

---

## ⚙️ System Architecture

1. **Frontend (User Interface):**  
   Handles user interactions (node selection), builds the delivery queue, and manages the animation engine that highlights paths returned by the backend.

2. **Backend (Python/Flask):**  
   Processes routing requests, maintains the graph adjacency list, and implements the Sequential and Optimized routing logic.

3. **C++ Offline Solver:**  
   A standalone program (`logic.cpp`) that mirrors the Python graph. It can be used for high-performance route crunching without the web overhead.

---

## 🏃 How to Run Locally

### Prerequisites
- Python 3.x
- C++ Compiler (e.g., G++)

### Steps
1. **Activate Environment:**
   ```powershell
   .\venv\Scripts\activate
   ```
2. **Install Dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```
3. **Start the Server:**
   ```powershell
   python app.py
   ```
4. **Compile C++ Logic (Optional):**
   ```powershell
   g++ logic.cpp -o logic
   ```

---

## 🌟 Project Rationale
This project serves as a practical demonstration of how graph theory applies to real-world logistics. By contrasting **Sequential** vs **Optimized** delivery flows, it highlights the efficiency gains of algorithmic pathfinding in supply chain management.
