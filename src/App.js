import React, { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', date: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`/tasks`, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', description: '', date: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (task) => {
    try {
      const response = await axios.put(`/tasks/${task.id}`, task);
      const updatedTasks = tasks.map((t) => (t.id === response.data.id ? response.data : t));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await axios.delete(`/tasks/${task.id}`);
      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
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
      </div>
      <h2>All Tasks</h2>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default App;
