import React, { useState } from 'react';
import './Taskform.css';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const minDate = new Date('2023-10-01');
    const maxDate = new Date('2024-05-01');

    if (selectedDate >= minDate && selectedDate <= maxDate) {
      setDueDate(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && dueDate) {
      addTask({ title, description, dueDate });
      setTitle('');
      setDescription('');
      setDueDate('');
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
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={handleDateChange}
          min="2023-10-01" 
          max="2024-05-30" 
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
