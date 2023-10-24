import React, { useState, useEffect } from 'react';
import TaskForm from './Taskform';
import TaskList from './TaskList';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Fetch tasks from the API endpoint when the component mounts
    axios.get('/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount.

  const addTask = (newTask) => {
    // Perform the API call to add the task to your database
    axios.post('/api/tasks', newTask)
      .then((response) => {
        // If the API call is successful, you can update the state with the new task from the response
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTask = (taskId, updatedTask) => {
    // Perform the API call to edit the task
    axios.patch(`/api/tasks/${taskId}`, updatedTask)
      .then((response) => {
        // If the API call is successful, you can update the state
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, ...response.data } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

 const deleteTask = (taskId) => {
  // Perform the API call to delete the task
  axios.delete(`/api/tasks/${taskId}`)
    .then(() => {
      // If the API call is successful, you can update the state
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    })
    .catch((error) => {
      console.error(error);
    });
};

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
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };

  // Rest of your component code remains the same.

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
        <TaskForm addTask={addTask} />
        {/* Add filter UI here */}
        <div>
          <button onClick={() => setFilter('All')}>All Tasks</button>
          <button onClick={() => setFilter('Completed')}>Completed</button>
          <button onClick={() => setFilter('Incomplete')}>Incomplete</button>
        </div>
        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} />
      </div>
    </div>
  );
}

export default App;
