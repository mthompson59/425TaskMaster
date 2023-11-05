import React, { useState } from 'react';


const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEdit = () => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-container">
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
            <label>
            Completed:
            <input
              type="checkbox"
              checked={updatedTask.completed}
              onChange={(e) => setUpdatedTask({ ...updatedTask, completed: e.target.checked })}
            />
          </label>
          <button className="edit-button" onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span><strong>Task Name:</strong> {task.name}</span>
          <span><strong>Description:</strong> {task.description}</span>
          <span><strong>Date:</strong> {task.date}</span>
          <span>{task.completed ? 'Completed' : 'Incomplete'}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
