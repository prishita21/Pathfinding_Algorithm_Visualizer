#include <vector>
#include <queue>
#include <emscripten.h>

struct Node {
    int index;
    int cost;
    bool operator>(const Node &other) const { return cost > other.cost; }
};

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    std::vector<int> dijkstra(int start, int goal, std::vector<std::vector<int>> graph) {
        std::priority_queue<Node, std::vector<Node>, std::greater<Node>> pq;
        std::vector<int> visited(graph.size(), 0), path;
        pq.push({start, 0});

        while (!pq.empty()) {
            Node current = pq.top();
            pq.pop();
            path.push_back(current.index);
            visited[current.index] = 1;

            if (current.index == goal) break;

            for (int neighbor : graph[current.index]) {
                if (!visited[neighbor]) {
                    pq.push({neighbor, 1});  // Assuming equal weights
                }
            }
        }
        return path;
    }
}
