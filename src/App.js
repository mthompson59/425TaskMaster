import React, { useState } from 'react';
import TaskForm from './Taskform';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // Initialize the filter state

  const addTask = (newTask) => {
    //add your axios call to your database to add a task here
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const editTask = (taskId, updatedTask) => {
    //add your axios call to your database to edit a task here
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  //you can add a use effect here to then fire when addTask, editTask, or deleteTask are called. This should refresh your app
  useEffect(() => {
    if (addTask, editTask, deleteTask) {
        window.location.reload(true);}
    }, []);

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
        <div>
          <button onClick={() => setFilter('All')}>All Tasks</button>
          <button onClick={() => setFilter('Completed')}>Completed</button>
          <button onClick={() => setFilter('Incomplete')}>Incomplete</button>
        </div>
        <TaskList tasks={filteredTasks()} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} />
      </div>
    </div>
  );
}

export default App;