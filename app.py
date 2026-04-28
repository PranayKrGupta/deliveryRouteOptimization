from flask import Flask, request, jsonify, render_template
import heapq
import os
import subprocess

app = Flask(__name__)

def build_adj_list(edges):
    adj = {}
    for edge in edges:
        u, v, w = edge['source'], edge['target'], float(edge['weight'])
        if u not in adj: adj[u] = {}
        if v not in adj: adj[v] = {}
        adj[u][v] = w
        adj[v][u] = w
    return adj

def run_dijkstra(adj, start, end):
    if start not in adj or end not in adj:
        return []
    heap = [(0, start, [])]
    visited = set()
    while heap:
        cost, node, path = heapq.heappop(heap)
        if node in visited: continue
        visited.add(node)
        path = path + [node]
        if node == end: return path
        for neighbor, weight in adj.get(node, {}).items():
            if neighbor not in visited:
                heapq.heappush(heap, (cost + weight, neighbor, path))
    return []

def run_cpp_dijkstra(edges, start, end):
    # Create a unique filename to avoid collisions between concurrent requests
    import uuid
    temp_filename = f"graph_{uuid.uuid4().hex}.txt"
    
    try:
        # 1. Write edges to the unique temporary file
        with open(temp_filename, "w") as f:
            for edge in edges:
                f.write(f"{edge['source']} {edge['target']} {edge['weight']}\n")
        
        # 2. Determine binary (./logic for Linux/Render, logic.exe for Windows)
        binary = "./logic" if os.name != 'nt' else "logic.exe"
        
        # 3. Call the binary
        result = subprocess.run(
            [binary, start, end, temp_filename], 
            capture_output=True, 
            text=True, 
            timeout=5
        )
        
        output_lines = result.stdout.strip().split('\n')
        path_line = output_lines[-1]
        if " -> " in path_line:
            return path_line.split(" -> ")
            
    except Exception as e:
        print(f"C++ execution failed, falling back to Python: {e}")
    
    finally:
        # 4. Clean up: Delete the temporary file
        if os.path.exists(temp_filename):
            try:
                os.remove(temp_filename)
            except:
                pass
    
    # Fallback to Python if C++ fails or returns no path
    adj = build_adj_list(edges)
    return run_dijkstra(adj, start, end)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/route_sequential", methods=["POST"])
def route_sequential():
    data = request.json
    queue = data.get("queue", [])
    edges = data.get("edges", [])
    
    if not queue:
        return jsonify({"error": "Queue is empty"}), 400
    
    adj = build_adj_list(edges)
    full_path = []
    current_node = "W1"
    total_distance = 0.0

    for item in queue:
        customer = item.get("customer")
        path = run_cpp_dijkstra(edges, current_node, customer)
        if not path: continue
        
        for i in range(len(path) - 1):
            total_distance += adj[path[i]][path[i+1]]
            
        if full_path: path = path[1:]
        full_path.extend(path)
        current_node = customer

    return jsonify({
        "path": full_path,
        "distance": round(total_distance, 2),
        "eta": round(total_distance * 2.5, 0)
    })

@app.route("/route_optimized", methods=["POST"])
def route_optimized():
    data = request.json
    queue = data.get("queue", [])
    edges = data.get("edges", [])
    
    if not queue:
        return jsonify({"error": "Queue is empty"}), 400

    adj = build_adj_list(edges)
    unvisited = [item.get("customer") for item in queue]
    full_path = []
    current_node = "W1"
    total_distance = 0.0

    while unvisited:
        nearest_customer = None
        shortest_dist = float('inf')
        best_path = []

        for customer in unvisited:
            path = run_cpp_dijkstra(edges, current_node, customer)
            if not path: continue
            
            dist = 0.0
            for i in range(len(path) - 1):
                dist += adj[path[i]][path[i+1]]
            
            if dist < shortest_dist:
                shortest_dist = dist
                nearest_customer = customer
                best_path = path

        if nearest_customer:
            total_distance += shortest_dist
            if full_path: best_path = best_path[1:]
            full_path.extend(best_path)
            current_node = nearest_customer
            unvisited.remove(nearest_customer)
        else:
            break

    return jsonify({
        "path": full_path,
        "distance": round(total_distance, 2),
        "eta": round(total_distance * 2.5, 0)
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
