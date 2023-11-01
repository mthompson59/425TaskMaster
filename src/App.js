import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm'; // Corrected import
import TaskList from './TaskList';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5039'; // Update with your backend server URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Fetch tasks from the API endpoint when the component mounts
    axios.get('/api/tasks')
      .then((response) => {
        // Here, you can access the response data and log it
        console.log('Response data:', response.data);
        // Now you can set your tasks state with the response data
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount.

 


  // Function to filter tasks based on the current filter
  const filteredTasks = () => {
    if (filter === 'All') {
      return tasks;
    } else if (filter === 'Completed') {
      return tasks.filter((task) => task.completed);
    } else if (filter === 'Incomplete') {
      return tasks.filter((task) => !task.completed);
    }
  };
    // Function to toggle task completion
    const toggleComplete = (taskId) => {
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };


  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">TaskMaster Home</a>
          </li>
        </ul>
      </nav>

      <div className="task-form-container">
        <h1>Task Master Dashboard</h1>
        <TaskForm   /> 
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;