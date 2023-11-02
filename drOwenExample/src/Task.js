// src/Task.js
import React, { useState } from 'react';

const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEdit = () => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.name}
            onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
          />
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          />
          <input
            type="date"
            value={updatedTask.date}
            onChange={(e) => setUpdatedTask({ ...updatedTask, date: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span>{task.name}</span>
          <span>{task.description}</span>
          <span>{task.date}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
