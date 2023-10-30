import React, { useState } from 'react';
import './Taskform.css';
import axios from 'axios'; // Import Axios

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description ) {
      const newTask = { title, description};
  
      axios.post('/api/tasks', newTask)
        .then((response) => {
          // Here, you can access the response data and log it
          console.log('Response data:', response.data);
  
          const addedTask = response.data;
          addTask(addedTask);
        })
        .catch((error) => {
          console.error(error);
        });
  
      setTitle('');
      setDescription('');
    }
  };
  

  return (
    <div className="task-form">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;