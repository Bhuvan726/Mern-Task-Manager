// src/components/YourComponent.js
import React, { useEffect, useState } from 'react';
import '../styles/styles.css'; // Link to your CSS file

const YourComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            const tasksData = await response.json();
            setTasks(tasksData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add a new task
    const addTask = async (e) => {
        e.preventDefault();
        if (!taskInput) return; // Prevent adding empty tasks

        const newTask = { title: taskInput };
        try {
            await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            setTaskInput(''); // Clear input after adding
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete a task by ID
    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE'
            });
            fetchTasks(); // Refresh task list after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Load tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="your-component">
            <h1>This is Your Custom Component</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    id="taskInput"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul id="taskList">
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.title}
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YourComponent;