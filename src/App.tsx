import { useState } from 'react';
import './App.css';
import GanttChart from './GanttChart';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <GanttChart />
        </>
    );
}

export default App;
