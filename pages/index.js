// import React, { useState } from 'react';
// import Grid from '../components/Grid';
// import ControlPanel from '../components/ControlPanel';
// import { dijkstra } from '../algorithms/dijkstra';

// const Home = () => {
//     const [grid, setGrid] = useState([]);
//     const [startNode, setStartNode] = useState(null);
//     const [endNode, setEndNode] = useState(null);
//     const [nodeCount, setNodeCount] = useState(0);
//     const [shortestDistance, setShortestDistance] = useState(0);

//     const updateGrid = (newGrid) => {
//         setGrid(newGrid);
//     };

//     const updateVisualization = async (grid, closestNode, endNode) => {
//         // Update the grid and visualization for each step
//         const newGrid = grid.slice();
//         newGrid[closestNode.row][closestNode.col] = { ...closestNode, isVisited: true };
//         setGrid(newGrid);

//         // Update the node count and distance
//         const nodesTraversed = newGrid.flat().filter(node => node.isVisited).length;
//         const distance = endNode.distance === Infinity ? 'No path' : endNode.distance;
//         setNodeCount(nodesTraversed);
//         setShortestDistance(distance);

//         // Wait before proceeding to the next step
//         await new Promise(resolve => setTimeout(resolve, 20)); // Adjust delay as needed
//     };

//     const handleRunAlgorithm = async () => {
//         if (!grid.length || !startNode || !endNode) {
//             console.error("Grid or nodes not properly initialized.");
//             return;
//         }

//         const newGrid = grid.slice(); // Copy grid to avoid direct mutation
//         const shortestPath = await dijkstra(newGrid, startNode, endNode, updateVisualization); // Pass update function

//         if (shortestPath.length === 0) {
//             console.log("No path found.");
//             return;
//         }

//         await visualizeAlgorithm(shortestPath); // Visualize the shortest path
//     };

//     const visualizeAlgorithm = async (shortestPath) => {
//         for (const node of shortestPath) {
//             await new Promise(resolve => setTimeout(resolve, 20)); // Adjust delay as needed
//             const newGrid = grid.slice();
//             newGrid[node.row][node.col] = { ...node, isShortest: true };
//             setGrid(newGrid);
//         }
//     };

//     return (
//         <div>
//             <Grid setGrid={setGrid} setStartNode={setStartNode} setEndNode={setEndNode} updateGrid={updateGrid} setNodeCount={setNodeCount} setShortestDistance={setShortestDistance} />
//             <ControlPanel onRunAlgorithm={handleRunAlgorithm} />
//             <div className="info-panel">
//                 <p>Nodes Traversed: {nodeCount}</p>
//                 <p>Shortest Distance: {shortestDistance}</p>
//             </div>
//         </div>
//     );
// };

// export default Home;
import React, { useState } from 'react';
import Grid from '../components/Grid';
import ControlPanel from '../components/ControlPanel';
import { dijkstra } from '../algorithms/dijkstra';
import { astar } from '../algorithms/aStar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';

const Home = () => {
    const [grid, setGrid] = useState([]);
    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);
    const [nodeCount, setNodeCount] = useState(0);
    const [shortestDistance, setShortestDistance] = useState(0);

    const updateGrid = (newGrid) => {
        setGrid(newGrid);
    };

    const updateVisualization = async (grid, closestNode, endNode) => {
        // Update the grid and visualization for each step
        const newGrid = grid.slice();
        newGrid[closestNode.row][closestNode.col] = { ...closestNode, isVisited: true };
        setGrid(newGrid);

        // Update the node count and distance
        const nodesTraversed = newGrid.flat().filter(node => node.isVisited).length;
        const distance = endNode.distance === Infinity ? 'No path' : endNode.distance;
        setNodeCount(nodesTraversed);
        setShortestDistance(distance);

        // Wait before proceeding to the next step
        await new Promise(resolve => setTimeout(resolve, 20)); // Adjust delay as needed
    };

    const handleRunDijkstra = async () => {
        if (!grid.length || !startNode || !endNode) {
            console.error("Grid or nodes not properly initialized.");
            return;
        }

        const newGrid = grid.slice(); // Copy grid to avoid direct mutation
        const shortestPath = await dijkstra(newGrid, startNode, endNode, updateVisualization); // Pass update function

        if (shortestPath.length === 0) {
            console.log("No path found.");
            return;
        }

        await visualizeAlgorithm(shortestPath); // Visualize the shortest path
    };

    const handleRunAStar = async () => {
        if (!grid.length || !startNode || !endNode) {
            console.error("Grid or nodes not properly initialized.");
            return;
        }

        const newGrid = grid.slice(); 
        const shortestPath = await astar(newGrid, startNode, endNode, updateVisualization); 

        if (shortestPath.length === 0) {
            console.log("No path found.");
            return;
        }

        await visualizeAlgorithm(shortestPath); 
    };

    const handleRunBFS = async () => {
        if (!grid.length || !startNode || !endNode) {
            console.error("Grid or nodes not properly initialized.");
            return;
        }

        const newGrid = grid.slice(); 
        const shortestPath = await bfs(newGrid, startNode, endNode, updateVisualization); 

        if (shortestPath.length === 0) {
            console.log("No path found.");
            return;
        }

        await visualizeAlgorithm(shortestPath); 
    };

    const handleRunDFS = async () => {
        if (!grid.length || !startNode || !endNode) {
            console.error("Grid or nodes not properly initialized.");
            return;
        }

        const newGrid = grid.slice(); 
        const shortestPath = await dfs(newGrid, startNode, endNode, updateVisualization); 

        if (shortestPath.length === 0) {
            console.log("No path found.");
            return;
        }

        await visualizeAlgorithm(shortestPath); 
    };

    const visualizeAlgorithm = async (shortestPath) => {
        for (const node of shortestPath) {
            await new Promise(resolve => setTimeout(resolve, 20)); // Adjust delay as needed
            const newGrid = grid.slice();
            newGrid[node.row][node.col] = { ...node, isShortest: true };
            setGrid(newGrid);
        }
    };

    return (
        <div>
            <Grid setGrid={setGrid} setStartNode={setStartNode} setEndNode={setEndNode} updateGrid={updateGrid} setNodeCount={setNodeCount} setShortestDistance={setShortestDistance} />
            <ControlPanel 
                onRunDijkstra={handleRunDijkstra} 
                onRunAStar={handleRunAStar} 
                onRunBFS={handleRunBFS} 
                onRunDFS={handleRunDFS} 
            />
            <div className="info-panel">
                <p>Nodes Traversed: {nodeCount}</p>
                <p>Shortest Distance: {shortestDistance}</p>
            </div>
        </div>
    );
};

export default Home;
