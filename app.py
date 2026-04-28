from flask import Flask, request, jsonify, render_template
import heapq

app = Flask(__name__)

# ---- Graph Definition for Dijkstra ----
graph = {
    'W1': {'J1': 2.1},
    'J1': {'W1': 2.1, 'J2': 1.8, 'C1': 1.2, 'J4': 3.2},
    'J2': {'J1': 1.8, 'C2': 1.5, 'J3': 2.3, 'J5': 2.7},
    'J3': {'J2': 2.3, 'C3': 1.7, 'J4': 1.9, 'J6': 2.9},
    'J4': {'J3': 1.9, 'C4': 1.4, 'J5': 2.2, 'J1': 3.2, 'J7': 3.1},
    'J5': {'J4': 2.2, 'C5': 1.6, 'J6': 1.8, 'J2': 2.7},
    'J6': {'J5': 1.8, 'C6': 1.3, 'J7': 2.4, 'J3': 2.9},
    'J7': {'J6': 2.4, 'J8': 1.7, 'J4': 3.1},
    'J8': {'J7': 1.7},

    # Customers
    'C1': {'J1': 1.2, 'J2': 2.1},
    'C2': {'J2': 1.5, 'J3': 1.9},
    'C3': {'J3': 1.7, 'J4': 2.2},
    'C4': {'J4': 1.4, 'J5': 1.8},
    'C5': {'J5': 1.6, 'J6': 2.0},
    'C6': {'J6': 1.3, 'J7': 1.6}
}

# ---- Render Frontend ----
def compute_distance(start, end):
    path = run_dijkstra(start, end)
    distance = 0.0
    for i in range(len(path) - 1):
        u, v = path[i], path[i + 1]
        distance += graph[u][v]
    return distance

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/route_sequential", methods=["POST"])
def route_sequential():
    data = request.json
    queue = data.get("queue")

    if not queue or len(queue) == 0:
        return jsonify({"error": "Queue is empty"}), 400

    full_path = []
    current_node = "W1"
    total_distance = 0.0

    for item in queue:
        customer = item.get("customer")
        path = run_dijkstra(current_node, customer)
        
        if not path:
            continue
            
        # Calculate distance for this leg
        for i in range(len(path) - 1):
            total_distance += graph[path[i]][path[i+1]]

        if full_path:
            path = path[1:]  # remove duplicate
        full_path.extend(path)
        current_node = customer

    return jsonify({
        "path": full_path,
        "distance": round(total_distance, 2),
        "eta": round(total_distance * 2.5, 0)  # Simple ETA: 2.5 min per km
    })


@app.route("/route_optimized", methods=["POST"])
def route_optimized():
    data = request.json
    queue = data.get("queue")

    if not queue or len(queue) == 0:
        return jsonify({"error": "Queue is empty"}), 400

    unvisited = [item.get("customer") for item in queue]
    full_path = []
    current_node = "W1"
    total_distance = 0.0

    while unvisited:
        # Find nearest neighbor
        nearest_customer = None
        shortest_dist = float('inf')
        best_path = []

        for customer in unvisited:
            path = run_dijkstra(current_node, customer)
            if not path:
                continue
                
            dist = 0.0
            for i in range(len(path) - 1):
                dist += graph[path[i]][path[i+1]]
            
            if dist < shortest_dist:
                shortest_dist = dist
                nearest_customer = customer
                best_path = path

        if nearest_customer:
            total_distance += shortest_dist
            if full_path:
                best_path = best_path[1:]
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


# ---- Dijkstra Shortest Path Algorithm ---- for web hosting-----
def run_dijkstra(start, end):
    heap = [(0, start, [])]
    visited = set()

    while heap:
        cost, node, path = heapq.heappop(heap)
        if node in visited:
            continue
        visited.add(node)
        path = path + [node]

        if node == end:
            return path

        for neighbor, weight in graph.get(node, {}).items():
            if neighbor not in visited:
                heapq.heappush(heap, (cost + weight, neighbor, path))

    return []  # No path found

# This part is for offline meachines not for hosted webApp
# import subprocess

# def run_dijkstra(start, end):
#     try:
#         # Run the compiled C++ program with start and end as arguments
#         result = subprocess.run(
#             ["./logic", start, end],      # Command
#             capture_output=True,          # Capture stdout and stderr
#             text=True,                    # Decode as string instead of bytes
#             check=True                    # Raise error if return code != 0
#         )

#         # The output from C++ (stdout)
#         output = result.stdout.strip()

#         # Example C++ output format:
#         # Shortest Path Cost: 10
#         # T1 -> J1 -> J2 -> J5 -> J6 -> J7 -> J8 -> B3

#         lines = output.splitlines()
#         if len(lines) < 2:
#             return []  # Something went wrong

#         path_line = lines[1]  # "T1 -> J1 -> ... -> B3"
#         path = [node.strip() for node in path_line.split("->")]

#         return path

#     except subprocess.CalledProcessError as e:
#         print("Error running C++ program:", e.stderr)
#         return []



# ---- Run App ----
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=10000)
