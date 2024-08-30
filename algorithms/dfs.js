export const dfs = async (grid, startNode, endNode, updateVisualization) => {
    const stack = [];
    stack.push(startNode);
    startNode.distance = 0;

    while (stack.length) {
        const currentNode = stack.pop();
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
                stack.push(neighbor);
            }
        }
    }

    return [];
};
