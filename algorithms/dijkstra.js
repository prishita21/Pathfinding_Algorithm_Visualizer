export const dijkstra = async (grid, startNode, endNode, updateVisualization) => {
    if (!Array.isArray(grid) || grid.length === 0) {
        throw new Error("Grid is not properly initialized.");
    }

    const unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return []; // No path

        closestNode.isVisited = true;

        // Visualize the current state of nodes
        await updateVisualization(grid, closestNode, endNode);

        if (closestNode === endNode) return reconstructPath(endNode);

        updateUnvisitedNeighbors(closestNode, grid);
    }

    return [];
};

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if (node.distance + 1 < neighbor.distance) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }
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
