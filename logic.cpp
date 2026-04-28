#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <queue>
#include <set>
#include <tuple>
#include <fstream>
#include <sstream>

using namespace std;

// Graph data (adjacency list)
map<string, vector<pair<string, double>>> graphData;

// Dijkstra's algorithm
vector<string> run_dijkstra(const string& start, const string& target) {
    priority_queue<
        tuple<double, string, vector<string>>, 
        vector<tuple<double, string, vector<string>>>, 
        greater<tuple<double, string, vector<string>>>
    > pq;

    set<string> visited;
    pq.push(make_tuple(0.0, start, vector<string>()));

    while (!pq.empty()) {
        auto top = pq.top();
        pq.pop();

        double cost = get<0>(top);
        string node = get<1>(top);
        vector<string> path = get<2>(top);

        if (visited.count(node)) continue;
        visited.insert(node);

        path.push_back(node);

        if (node == target) {
            cout << "Shortest Path Cost: " << cost << endl;
            return path;
        }

        for (const auto& edge : graphData[node]) {
            string neighbor = edge.first;
            double weight = edge.second;
            if (!visited.count(neighbor)) {
                pq.push(make_tuple(cost + weight, neighbor, path));
            }
        }
    }

    return {};
}

int main(int argc, char* argv[]) {
    string start, target, graphFile = "graph.txt";

    if (argc >= 3) {
        start = argv[1];
        target = argv[2];
        if (argc == 4) graphFile = argv[3];
    } else {
        cerr << "Usage: " << argv[0] << " <start> <target> [graph_file]\n";
        return 1;
    }

    // Load graph from file
    ifstream file(graphFile);
    if (!file.is_open()) {
        cerr << "Error: Could not open graph file " << graphFile << endl;
        return 1;
    }

    string line, u, v;
    double w;
    while (getline(file, line)) {
        stringstream ss(line);
        if (ss >> u >> v >> w) {
            graphData[u].push_back({v, w});
            graphData[v].push_back({u, w}); // Undirected
        }
    }

    // Run Dijkstra
    vector<string> path = run_dijkstra(start, target);

    if (path.empty()) {
        cout << "No path found\n";
    } else {
        for (size_t i = 0; i < path.size(); i++) {
            cout << path[i];
            if (i != path.size() - 1) cout << " -> ";
        }
        cout << endl;
    }

    return 0;
}
