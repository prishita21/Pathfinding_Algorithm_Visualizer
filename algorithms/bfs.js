export const bfs = async (grid, startNode, endNode, updateVisualization) => {
    const queue = [];
    const visitedNodesInOrder = [];
    queue.push(startNode);
    startNode.distance = 0;

    while (queue.length) {
        const currentNode = queue.shift();
        if (currentNode.isWall) continue;

        // Visualize the current state of nodes
        await updateVisualization(grid, currentNode, endNode);

        if (currentNode === endNode) return reconstructPath(endNode);

        const unvisitedNeighbors = getNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            if (!neighbor.isVisited) {
                neighbor.isVisited = true;
                neighbor.distance = currentNode.distance + 1;
                neighbor.previousNode = currentNode;
                queue.push(neighbor);
            }
        }
    }

    return [];
};
