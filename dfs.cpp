#include <vector>
#include <emscripten.h>

std::vector<int> visited;
std::vector<int> path;

extern "C" {
    void dfsHelper(int node, int goal, int* graph, int num_nodes) {
        path.push_back(node);
        visited[node] = 1;

        if (node == goal) return;

        for (int i = 0; i < num_nodes; ++i) {
            if (graph[node * num_nodes + i] == 1 && !visited[i]) {
                dfsHelper(i, goal, graph, num_nodes);
            }
        }
    }

    EMSCRIPTEN_KEEPALIVE
    int* dfs(int start, int goal, int* graph, int num_nodes) {
        visited.assign(num_nodes, 0);
        path.clear();
        dfsHelper(start, goal, graph, num_nodes);
        return path.data();  // Return pointer to the path
    }

    EMSCRIPTEN_KEEPALIVE
    int dfs_get_path_length() {
        return path.size();
    }
}
