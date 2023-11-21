// App.js
import React, { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';
import './App.css';
import Navbar from './navbar';
import TaskFormModal from './TaskFormModal';

axios.defaults.baseURL = 'http://localhost:5039';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', date: '', completed: false });
  const [errorMessage, setErrorMessage] = useState(null);
  const [completedFilter, setCompletedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [completedFilter, dateFilter]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/tasks`);
      const formattedTasks = response.data.map((task) => ({
        ...task,
        date: new Date(task.date).toISOString(),
      }));

      const filteredTasks =
        completedFilter === 'completed'
          ? formattedTasks.filter((task) => task.completed)
          : completedFilter === 'incomplete'
          ? formattedTasks.filter((task) => !task.completed)
          : formattedTasks;

      const sortedTasks = filteredTasks.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateFilter === 'closest') {
          return dateA - dateB;
        } else if (dateFilter === 'furthest') {
          return dateB - dateA;
        }

        return 0;
      });

      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setErrorMessage('An error occurred while fetching tasks');
    }
  };

  const handleAddTask = async () => {
    try {
      const currentDate = new Date()  ;
      const selectedDate = new Date(newTask.date  +'T10:00:00');
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      
      
      console.log('Current Date:', currentDate);
      console.log('Selected Date:', selectedDate);

      if (selectedDate < currentDate) {
        setErrorMessage("You can't enter a date in the past");
        return;
      }

      const response = await axios.post(`/api/tasks`, {
        ...newTask,
        date: selectedDate.toISOString(),
      });

      setTasks([
        ...tasks,
        {
          ...response.data,
          date: new Date(response.data.date).toISOString(),
        },
      ]);
      setNewTask({ name: '', description: '', date: '', completed: false });
      setIsModalOpen(false);
      setErrorMessage(null);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      setErrorMessage('An error occurred while adding the task');
    }
  };

  const handleEditTask = async (task) => {
    try {
      const currentDate = new Date();
      const editedDate = new Date(task.date);
      const originalDate = new Date(task.date);
  
      currentDate.setDate(currentDate.getDate() - 1);
      currentDate.setHours(0, 0, 0, 0);
  
      console.log('Current Date:', currentDate);
      console.log('Selected Date:', editedDate);
      console.log('Selected Date:', originalDate);
  
      // Check if the date value has changed
      if (newTask.date !== task.date) {
        // Check if the edited date is in the past
        if (editedDate < currentDate) {
          setErrorMessage("You can't enter a date in the past");
  
          // Use the original date to set the date value
          setNewTask({ ...newTask, date: originalDate.toISOString() });
          return;
        }
      }
  
      const response = await axios.put(`/api/tasks/${task._id}`, {
        ...task,
        date: editedDate.toISOString(),
      });
  
      const updatedTasks = tasks.map((t) =>
        t._id === response.data._id
          ? {
              ...response.data,
              date: new Date(response.data.date).toISOString(),
            }
          : t
      );
      setTasks(updatedTasks);
      setErrorMessage(null);
      fetchTasks();
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

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      <Navbar onAddClick={handleToggleModal} />
      <div className="container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="header-container">
          <h2 className="all-tasks-heading">All Tasks</h2>
          <div className="filters-container">
            <label>Status:</label>
            <select value={completedFilter} onChange={(e) => setCompletedFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
            <label>Date:</label>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="closest">Closest</option>
              <option value="furthest">Furthest</option>
            </select>
          </div>
        </div>
        <div>
          {tasks.map((task) => (
            <Task key={task._id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
          ))}
        </div>
        {isModalOpen && (
          <TaskFormModal
            onClose={handleToggleModal}
            onSave={handleAddTask}
            newTask={newTask}
            onInputChange={(e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })}
          />
        )}
      </div>
    </div>
  );
};

export default App;
