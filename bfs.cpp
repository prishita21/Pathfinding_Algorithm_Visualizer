#include <vector>
#include <queue>
#include <unordered_map>
#include <emscripten.h>
#include <cstdlib>  // For malloc and free

// Declare buffer to store the result path in WebAssembly memory.
int* result_path = nullptr;
int path_length = 0;

// BFS function that finds the shortest path between start and goal in an unweighted graph.
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int* bfs(int start, int goal, int num_nodes, int* graph_ptr, int* graph_sizes) {
        // Convert flat array into adjacency list format.
        std::vector<std::vector<int>> graph(num_nodes);
        int index = 0;
        for (int i = 0; i < num_nodes; i++) {
            for (int j = 0; j < graph_sizes[i]; j++) {
                graph[i].push_back(graph_ptr[index++]);
            }
        }

        std::queue<int> q;
        std::unordered_map<int, int> parent;  // To reconstruct the path
        std::vector<bool> visited(num_nodes, false);

        q.push(start);
        visited[start] = true;
        parent[start] = -1;

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            if (node == goal) {
                // Reconstruct the path
                std::vector<int> path;
                for (int v = goal; v != -1; v = parent[v]) {
                    path.push_back(v);
                }
                std::reverse(path.begin(), path.end());

                // Allocate memory for the path in WebAssembly memory
                path_length = path.size();
                result_path = (int*)malloc(path_length * sizeof(int));
                for (int i = 0; i < path_length; i++) {
                    result_path[i] = path[i];
                }
                return result_path;
            }

            for (int neighbor : graph[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                    parent[neighbor] = node;
                }
            }
        }

        // If no path is found, return an empty path
        path_length = 0;
        return nullptr;
    }

    EMSCRIPTEN_KEEPALIVE
    int bfs_get_path_length() {
        return path_length;
    }

    EMSCRIPTEN_KEEPALIVE
    void free_result_path() {
        if (result_path != nullptr) {
            free(result_path);
            result_path = nullptr;
        }
    }
}
