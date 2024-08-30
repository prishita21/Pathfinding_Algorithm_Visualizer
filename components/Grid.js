import React, { useState, useEffect } from 'react';
import Node from './Node';
import { createGrid, getNewGridWithWallToggled } from '../utils/gridUtils';

const Grid = ({ setGrid, setStartNode, setEndNode, updateGrid, setNodeCount, setShortestDistance }) => {
    const [grid, setLocalGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    useEffect(() => {
        const initialGrid = createGrid();
        setLocalGrid(initialGrid);
        setGrid(initialGrid); // Set grid state in parent component
        setStartNode(initialGrid[10][5]); // Set default start node
        setEndNode(initialGrid[10][45]); // Set default end node
    }, [setGrid, setStartNode, setEndNode]);

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setLocalGrid(newGrid);
        setGrid(newGrid); // Update grid in parent component
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setLocalGrid(newGrid);
        setGrid(newGrid); // Update grid in parent component
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    useEffect(() => {
        if (updateGrid) {
            updateGrid(grid); // Update grid when the grid state changes, only if updateGrid exists
        }
    }, [grid, updateGrid]);

    if (grid.length === 0 || !grid[0]) {
        return <div>Loading...</div>; // Or a spinner if you prefer
    }

    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 25px)` }}>
            {grid.map((row, rowIdx) => {
                return row.map((node, nodeIdx) => {
                    const { row, col, isStart, isEnd, isWall, isVisited, isShortest } = node;
                    return (
                        <Node
                            key={`${rowIdx}-${nodeIdx}`}
                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                            isVisited={isVisited}
                            isShortest={isShortest}
                            onMouseDown={() => handleMouseDown(row, col)}
                            onMouseEnter={() => handleMouseEnter(row, col)}
                            onMouseUp={handleMouseUp}
                        />
                    );
                });
            })}
        </div>
    );
};

export default Grid;
