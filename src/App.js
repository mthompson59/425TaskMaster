import React, { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';

import './App.css'; // Import your CSS file

axios.defaults.baseURL = 'http://localhost:5039';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', date: '', completed: false });
  const [errorMessage, setErrorMessage] = useState(null);
  const [filterOption, setFilterOption] = useState('all'); // 'all', 'completed', or 'incomplete'

  useEffect(() => {
    fetchTasks();
  }, [filterOption]); // Refetch tasks when the filter option changes

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/tasks`);
      const formattedTasks = response.data.map(task => ({
        ...task,
        date: new Date(task.date).toLocaleDateString('en-US'),
      }));

      // Filter tasks based on the selected option
      const filteredTasks = filterOption === 'completed'
        ? formattedTasks.filter(task => task.completed)
        : filterOption === 'incomplete'
          ? formattedTasks.filter(task => !task.completed)
          : formattedTasks;

      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setErrorMessage('An error occurred while fetching tasks');
    }
  };

  const handleAddTask = async () => {
    try {
      const currentDate = new Date();
      const selectedDate = new Date(newTask.date + 'T10:00:00Z');

      // Check if the selected date is in the future
      if (selectedDate < currentDate) {
        setErrorMessage("You can't enter a date in the past");
        return;
      }

      const response = await axios.post(`/api/tasks`, {
        ...newTask,
        date: selectedDate.toISOString(),
      });

      setTasks([...tasks, { ...response.data, date: new Date(response.data.date).toLocaleDateString('en-US') }]);
      setNewTask({ name: '', description: '', date: '', completed: false });
    } catch (error) {
      console.error('Error adding task:', error);
      setErrorMessage('An error occurred while adding the task');
    }
  };

  const handleEditTask = async (task) => {
    try {
      const currentDate = new Date();
      const editedDate = new Date(task.date + 'T10:00:00Z');

      // Check if the edited date is in the future
      if (editedDate < currentDate) {
        setErrorMessage("You can't enter a date in the past");
        return;
      }

      // When editing, include the date field
      const response = await axios.put(`/api/tasks/${task._id}`, task);
      const updatedTasks = tasks.map((t) => (t._id === response.data._id ? { ...response.data, date: new Date(response.data.date).toLocaleDateString('en-US') } : t));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing task:', error);
      setErrorMessage('An error occurred while editing the task');
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      const updatedTasks = tasks.filter((t) => t._id !== task._id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      setErrorMessage('An error occurred while deleting the task');
    }
  };

  const handleSortByDate = (ascending) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return ascending ? dateA - dateB : dateB - dateA;
    });

    setTasks(sortedTasks);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <button onClick={handleAddTask}>Add</button>
        <button onClick={() => handleSortByDate(true)}>Sort by Closest Date</button>
        <button onClick={() => handleSortByDate(false)}>Sort by Furthest Date</button>
        <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </select>
      </div>
      <h2>All Tasks</h2>
      <div>
        {tasks.map((task) => (
          <Task key={task._id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default App;
