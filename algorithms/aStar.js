export const aStar = async (grid, startNode, endNode, updateVisualization) => {
    if (!Array.isArray(grid) || grid.length === 0) {
        throw new Error("Grid is not properly initialized.");
    }

    const openSet = [];
    startNode.distance = 0;
    startNode.heuristic = heuristic(startNode, endNode);
    startNode.totalCost = startNode.distance + startNode.heuristic;
    openSet.push(startNode);

    while (openSet.length > 0) {
        sortNodesByTotalCost(openSet);
        const closestNode = openSet.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return []; // No path

        closestNode.isVisited = true;

        // Visualize the current state of nodes
        await updateVisualization(grid, closestNode, endNode);

        if (closestNode === endNode) return reconstructPath(endNode);

        updateUnvisitedNeighborsAStar(closestNode, grid, endNode, openSet);
    }

    return [];
};

const sortNodesByTotalCost = (openSet) => {
    openSet.sort((a, b) => a.totalCost - b.totalCost);
};

const updateUnvisitedNeighborsAStar = (node, grid, endNode, openSet) => {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const tentativeDistance = node.distance + 1;

        if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.heuristic = heuristic(neighbor, endNode);
            neighbor.totalCost = neighbor.distance + neighbor.heuristic;
            neighbor.previousNode = node;

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            }
        }
    }
};

const heuristic = (node, endNode) => {
    // Manhattan distance as heuristic
    const dx = Math.abs(node.row - endNode.row);
    const dy = Math.abs(node.col - endNode.col);
    return dx + dy;
};
const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
};

const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
        if (!Array.isArray(row)) continue;
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
};

const reconstructPath = (endNode) => {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
};
// Reuse getNeighbors, getAllNodes, and reconstructPath functions from Dijkstra
