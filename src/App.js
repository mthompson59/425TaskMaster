import logo from './logo.svg';
import './App.css';
import './Header.js';
import './DashBoard.js';
import './TaskList.js';
import './EditTask.js';
import './addTask.js';


import Header from './Header.js';
import AddTask from './addTask';
import EditTask from './EditTask.js';
import DashBoard from './DashBoard.js';
     // App.js

     import React, { useState } from 'react';

     import TaskList from './TaskList';
  
    
  
     import Task from './Task';
  
   
  
     const App = () => {
  
       const [tasks, setTasks] = useState([]);
  
       const [selectedTask, setSelectedTask] = useState(null);
  
   
  
       const handleAddTask = (newTask) => {
  
         // Create a new task with a unique ID and mark it as not completed
  
         const task = { ...newTask, id: tasks.length + 1, completed: false };
  
         setTasks([...tasks, task]);
  
       };
  
   
  
       const handleTaskClick = (taskId) => {
  
         // Find and select the clicked task
  
         const task = tasks.find((t) => t.id === taskId);
  
         setSelectedTask(task);
  
       };
  
   
  
       const handleEditTask = (editedTask) => {
  
         // Update the task and clear the selection
  
         setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
  
         setSelectedTask(null);
  
       };
  
   
  
       const handleDeleteTask = (taskId) => {
  
         // Delete the task and clear the selection
  
         setTasks(tasks.filter((task) => task.id !== taskId));
  
         setSelectedTask(null);
  
       };
  
   
  
       return (
  
         <div>
  
           <h1>TaskMaster</h1>
  
           <TaskForm onTaskAdd={handleAddTask} />
  
           <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
  
           {selectedTask && (
  
             <Task task={selectedTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
  
           )}
  
         </div>
  
       );
  
     };
  
   
  
     export default App;