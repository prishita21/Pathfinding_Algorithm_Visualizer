import React from 'react';

const Node = ({ isStart, isEnd, isWall, isVisited, isShortest, onMouseDown, onMouseEnter, onMouseUp }) => {
    const extraClassName = 
        isStart ? 'node-start' :
        isEnd ? 'node-end' :
        isWall ? 'node-wall' :
        isShortest ? 'node-shortest-path' :
        isVisited ? 'node-visited' : '';

    return (
        <div
            className={`node ${extraClassName}`}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        ></div>
    );
};

export default Node;
