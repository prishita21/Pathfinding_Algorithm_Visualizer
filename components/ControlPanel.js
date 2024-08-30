// import React from 'react';

// const ControlPanel = ({ onRunAlgorithm }) => {
//     return (
//         <div className="control-panel">
//             <button onClick={onRunAlgorithm}>Run Algorithm</button>
//         </div>
//     );
// };

// export default ControlPanel;
import React from 'react';

const ControlPanel = ({ onRunDijkstra, onRunAStar, onRunBFS, onRunDFS }) => {
    return (
        <div className="control-panel">
            <button onClick={onRunDijkstra}>Run Dijkstra</button>
            <button onClick={onRunAStar}>Run A*</button>
            <button onClick={onRunBFS}>Run BFS</button>
            <button onClick={onRunDFS}>Run DFS</button>
        </div>
    );
};

export default ControlPanel;
