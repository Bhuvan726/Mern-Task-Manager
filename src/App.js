// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Your main CSS file, if any
import TaskForm from './components/TaskForm'; // Import TaskForm component
import TaskList from './components/TaskList'; // Import TaskList component
import YourComponent from './components/YourComponent'; // Import your new component

const App = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Delete a task by ID
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks(); // Refresh the task list after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Load tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="App">
            <h1>MERN Task Manager</h1>
            <TaskForm fetchTasks={fetchTasks} />
            <TaskList tasks={tasks} onDelete={deleteTask} />
            <YourComponent /> {/* Include your custom component */}
        </div>
    );
};

export default App;